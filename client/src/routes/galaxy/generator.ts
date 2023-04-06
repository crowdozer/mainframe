/**
 * Galaxy generation is adapted from this:
 * https://www.reddit.com/r/gamedev/comments/20ach8/how_to_generate_star_positions_in_a_2d_procedural/
 */
export class GalaxyGenerator {
	// Configuration variables for star creation and galaxy display

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	// How many stars to keep track of
	private numStars: number;
	// How many arms the galaxy should have
	private numArms: number;
	// Distance between arms in degrees
	private armSeparationDistance: number;
	// All of the stars as x,y coordinates
	private starPositions: { angle: number; distance: number }[];
	// This constant determines the maximum offset that can be applied to a star's
	// position along the spiral arm of the galaxy. The greater the value, the more
	// scattered the stars will appear along the spiral arms, creating a more dispersed
	// or irregular spiral galaxy.
	private armOffsetMax: number;
	// This constant controls the rate at which the galaxy rotates. A higher value
	// will result in more axial rotation, while a lower value will slow the rotation.
	private rotationFactor: number;
	// This constant is used to add randomness to the star positions by applying
	// a small random offset to the x and y coordinates of each star. This makes
	// the galaxy look more natural, as the stars won't be perfectly aligned along
	// the spiral arms. The larger the value, the more dispersed the stars will be
	// around their intended position, leading to a more irregular galaxy appearance.
	private randomOffsetXY: number;
	// This constant puts a void in the center of the galaxy (low values, e.g .05)
	private blackHoleOffset: number;
	// How aggressively should distant objects experience slowed rotation
	// 0.0 = none
	// 1.0 = fully slowed at 100% distance
	// 1+  = speed up with distance
	private distanceRotationFalloffScale = 0.2;
	// Causes stars to drift towards the center
	private distanceDecayPercentPerStep = 0.99995;

	// Configuration variables for ASCII art conversion

	// Ascii width
	private asciiWidth: number;
	// Ascii height
	private asciiHeight: number;
	// The characters to use in converting grayscale intensity to ascii
	public alphabet: string;
	// How many degrees to rotate the galaxy per step
	public rotationStep: number;
	// What to do when a new ascii frame is delivered
	private onNewFrame: (ascii: string) => void;

	// Debug
	private asciiInvocations = 0;
	private drawStarsInvocations = 0;
	private rotationInvocations = 0;

	constructor(config: {
		numStars: number;
		numArms: number;
		armOffsetMax: number;
		rotationFactor: number;
		randomOffsetXY: number;
		asciiWidth: number;
		asciiHeight: number;
		alphabet: string;
		rotationStep: number;
		canvas: HTMLCanvasElement;
		blackHoleOffset?: number;
		canvasWidth?: number;
		canvasHeight?: number;
		onNewFrame: (ascii: string) => void;
	}) {
		this.numStars = config.numStars;
		this.numArms = config.numArms;
		this.armSeparationDistance = (2 * Math.PI) / this.numArms;
		this.starPositions = [...new Array(this.numStars)].map(() => ({
			angle: 0,
			distance: 0
		}));
		this.armOffsetMax = config.armOffsetMax;
		this.rotationFactor = config.rotationFactor;
		this.randomOffsetXY = config.randomOffsetXY;
		this.asciiWidth = config.asciiWidth;
		this.asciiHeight = config.asciiHeight;
		this.alphabet = config.alphabet;
		this.rotationStep = config.rotationStep;
		this.canvas = config.canvas;
		this.canvas.width = config.canvasWidth || 200;
		this.canvas.height = config.canvasHeight || 200;
		this.blackHoleOffset = config.blackHoleOffset || 0.05;
		this.onNewFrame = config.onNewFrame;
		this.ctx = config.canvas.getContext('2d', {
			willReadFrequently: true
		}) as CanvasRenderingContext2D;
	}

	/**
	 * Runs the given callback at the given fps
	 */
	private asFPSInterval(callback: () => void, fps: number): () => void {
		const interval = setInterval(callback.bind(this), 1000 / fps);

		return () => clearInterval(interval);
	}

	/**
	 * Begins the ascii render interval
	 */
	private beginAsciiInterval(fps: number): () => void {
		return this.asFPSInterval(() => {
			this.asciiInvocations++;
			return this.canvasToAscii();
		}, fps);
	}

	/**
	 * Begins the star render interval
	 */
	private beginDrawStarsInterval(fps: number): () => void {
		return this.asFPSInterval(() => {
			this.drawStarsInvocations++;
			return this.drawStars();
		}, fps);
	}

	/**
	 * Begins the galaxy rotation interval
	 */
	private beginRotationInterval(fps: number): () => void {
		return this.asFPSInterval(() => {
			this.rotationInvocations++;
			return this.rotateGalaxy();
		}, fps);
	}

	/**
	 * Begins the performance interval
	 */
	private beginPerformanceInterval(): () => void {
		let startTime = performance.now();

		const interval = setInterval(() => {
			// calculate IPS (invocations per second)
			const elapsedTime = performance.now() - startTime;
			const asciiIPS = this.asciiInvocations / (elapsedTime / 1000);
			const drawStarsIPS = this.drawStarsInvocations / (elapsedTime / 1000);
			const rotationIPS = this.rotationInvocations / (elapsedTime / 1000);

			console.log(
				'IPS (ascii, draw stars, rotation) %s - %s - %s',
				asciiIPS,
				drawStarsIPS,
				rotationIPS
			);

			// restart
			this.asciiInvocations = 0;
			this.drawStarsInvocations = 0;
			this.rotationInvocations = 0;
			startTime = performance.now();
		}, 5000);

		return () => clearInterval(interval);
	}

	/**
	 * Begins all intervals and returns a cleanup function
	 */
	public beginIntervals(fps: number): () => void {
		const clearIntervals = [
			this.beginRotationInterval(fps),
			this.beginDrawStarsInterval(fps),
			this.beginAsciiInterval(fps),
			this.beginPerformanceInterval()
		];

		return () => {
			clearIntervals.forEach((clear) => clear());
		};
	}

	// Initialize star positions in the galaxy
	public initializeStars() {
		// Iterate through starPositions array and set each star's x and y coordinates
		for (let i = 0; i < this.starPositions.length; i++) {
			// Calculate distance, angle, and armOffset for each star
			let distance = this.randFloat();
			distance = Math.pow(distance, 2);

			let angle = this.randFloat() * 2 * Math.PI;
			let armOffset = this.randFloat() * this.armOffsetMax;
			armOffset = armOffset - this.armOffsetMax / 2;
			armOffset = armOffset * (1 / distance);

			let squaredArmOffset = Math.pow(armOffset, 2);
			if (armOffset < 0) squaredArmOffset = squaredArmOffset * -1;
			armOffset = squaredArmOffset;

			// inverting distance to reverse the spiral direction
			const rotation = -distance * this.rotationFactor;

			angle =
				Math.floor(angle / this.armSeparationDistance) * this.armSeparationDistance +
				armOffset +
				rotation;

			// put a black hole at the center
			distance += this.blackHoleOffset;
			distance += this.randFloat() * this.randomOffsetXY;
			// shrink the entire drawing down
			distance *= 0.75;

			this.starPositions[i] = { angle, distance };
		}
	}

	// Rotate the galaxy by a given step in degrees
	public rotateGalaxy(stepDegrees: number = this.rotationStep) {
		const stepRadians = stepDegrees * (Math.PI / 180);

		for (let i = 0; i < this.starPositions.length; i++) {
			const { distance } = this.starPositions[i];

			const percentDrag = distance * this.distanceRotationFalloffScale;
			const radiansDrag = stepRadians * percentDrag;

			this.starPositions[i].angle += stepRadians - radiansDrag;
			this.starPositions[i].distance *= this.distanceDecayPercentPerStep;
		}
	}

	// Generate random float between 0 and 1
	private randFloat(): number {
		return Math.random();
	}

	// Draw stars on the canvas
	private drawStars() {
		const centerX = this.canvas.width / 2;
		const centerY = this.canvas.height / 2;

		if (!this.ctx) return;

		// Clear the canvas and set the background color to black
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		// Draw white dots for each star on the canvas
		this.ctx.fillStyle = '#fff';
		for (const star of this.starPositions) {
			this.ctx.beginPath();
			const [starX, starY] = this.polarToCartesian(star.angle, star.distance);
			const xpos = centerX + starX * centerX;
			const ypos = centerY + starY * centerY;
			this.ctx.arc(xpos, ypos, 1, 0, 2 * Math.PI);
			this.ctx.fill();
		}
	}

	private polarToCartesian(angle: number, distance: number): [number, number] {
		const x = distance * Math.cos(angle);
		const y = distance * Math.sin(angle);
		return [x, y];
	}

	// Convert the canvas image to ASCII art
	private canvasToAscii(): void {
		// Downscale the canvas image to match the desired output resolution
		const tempCanvas = document.createElement('canvas');
		const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
		tempCanvas.width = this.asciiWidth;
		tempCanvas.height = this.asciiHeight;
		if (!tempCtx) return;

		tempCtx.drawImage(this.canvas, 0, 0, this.asciiWidth, this.asciiHeight);

		let asciiArt = '';

		// Iterate through the downscaled canvas image and convert each pixel to an ASCII character
		for (let y = 0; y < this.asciiHeight; y++) {
			for (let x = 0; x < this.asciiWidth; x++) {
				const pixel = tempCtx.getImageData(x, y, 1, 1).data;
				const grayscale = Math.round((pixel[0] + pixel[1] + pixel[2]) / 3);
				const asciiChar = this.mapGrayscaleToAscii(grayscale);
				asciiArt += asciiChar;
			}
			asciiArt += '\n';
		}

		tempCanvas.remove();

		this.onNewFrame(asciiArt);
	}

	// Map grayscale pixel values to ASCII characters
	private mapGrayscaleToAscii(value: number): string {
		const index = Math.round(((this.alphabet.length - 1) * value) / 255);
		return this.alphabet[index];
	}
}
