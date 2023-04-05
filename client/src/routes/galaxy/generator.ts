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
	private starPositions: { x: number; y: number }[];
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

	// Configuration variables for ASCII art conversion

	// Ascii width
	private targetWidth: number;
	// Ascii height
	private targetHeight: number;
	// The characters to use in converting grayscale intensity to ascii
	public alphabet: string;
	// How many degrees to rotate the galaxy per step
	public rotationStep: number;

	constructor(config: {
		numStars: number;
		numArms: number;
		armOffsetMax: number;
		rotationFactor: number;
		randomOffsetXY: number;
		targetWidth: number;
		targetHeight: number;
		alphabet: string;
		rotationStep: number;
		canvas: HTMLCanvasElement;
	}) {
		this.numStars = config.numStars;
		this.numArms = config.numArms;
		this.armSeparationDistance = (2 * Math.PI) / this.numArms;
		this.starPositions = [...new Array(this.numStars)].map(() => ({
			x: 0,
			y: 0
		}));
		this.armOffsetMax = config.armOffsetMax;
		this.rotationFactor = config.rotationFactor;
		this.randomOffsetXY = config.randomOffsetXY;
		this.targetWidth = config.targetWidth;
		this.targetHeight = config.targetHeight;
		this.alphabet = config.alphabet;
		this.rotationStep = config.rotationStep;
		this.canvas = config.canvas;
		this.ctx = config.canvas.getContext('2d', {
			willReadFrequently: true
		}) as CanvasRenderingContext2D;
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

			const rotation = distance * this.rotationFactor;

			angle =
				Math.floor(angle / this.armSeparationDistance) * this.armSeparationDistance +
				armOffset +
				rotation;

			let starX = Math.cos(angle) * distance;
			let starY = Math.sin(angle) * distance;

			const randomOffsetX = this.randFloat() * this.randomOffsetXY;
			const randomOffsetY = this.randFloat() * this.randomOffsetXY;

			starX += randomOffsetX;
			starY += randomOffsetY;

			this.starPositions[i].x = starX;
			this.starPositions[i].y = starY;
		}
	}

	// Rotate the galaxy by a given step in degrees
	public rotateGalaxy(stepDegrees: number = this.rotationStep) {
		const stepRadians = stepDegrees * (Math.PI / 180);

		for (let i = 0; i < this.starPositions.length; i++) {
			const star = this.starPositions[i];
			const x = star.x;
			const y = star.y;
			const angle = Math.atan2(y, x);
			const distance = Math.sqrt(x * x + y * y);

			const newAngle = angle + stepRadians;
			this.starPositions[i].x = Math.cos(newAngle) * distance;
			this.starPositions[i].y = Math.sin(newAngle) * distance;
		}
	}

	// Render the spinning galaxy on the canvas and update the ASCII art
	public renderFrame() {
		this.drawStars();
		return this.canvasToAscii();
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
			this.ctx.arc(centerX + star.x * centerX, centerY + star.y * centerY, 1, 0, 2 * Math.PI);
			this.ctx.fill();
		}
	}

	// Convert the canvas image to ASCII art
	private canvasToAscii(): string {
		// Downscale the canvas image to match the desired output resolution
		const tempCanvas = document.createElement('canvas');
		const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
		tempCanvas.width = this.targetWidth;
		tempCanvas.height = this.targetHeight;
		if (!tempCtx) return '';
		tempCtx.drawImage(this.canvas, 0, 0, this.targetWidth, this.targetHeight);

		let asciiArt = '';

		// Iterate through the downscaled canvas image and convert each pixel to an ASCII character
		for (let y = 0; y < this.targetHeight; y++) {
			for (let x = 0; x < this.targetWidth; x++) {
				const pixel = tempCtx.getImageData(x, y, 1, 1).data;
				const grayscale = Math.round((pixel[0] + pixel[1] + pixel[2]) / 3);
				const asciiChar = this.mapGrayscaleToAscii(grayscale);
				asciiArt += asciiChar;
			}
			asciiArt += '\n';
		}

		return asciiArt;
	}

	// Map grayscale pixel values to ASCII characters
	private mapGrayscaleToAscii(value: number): string {
		const index = Math.round(((this.alphabet.length - 1) * value) / 255);
		return this.alphabet[index];
	}
}
