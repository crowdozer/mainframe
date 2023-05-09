type PerformanceInfo = {
	invocations: number;
};

/**
 * Galaxy generation is adapted from this:
 * https://www.reddit.com/r/gamedev/comments/20ach8/how_to_generate_star_positions_in_a_2d_procedural/
 */
export class AsciiGenerator {
	constructor(config: {
		alphabet: string;
		canvas: HTMLCanvasElement;
		fontFamily?: string;
		fontSizePx?: number;
		onPerformanceUpdate: (ips: number) => void;
	}) {
		this.fontFamily = config.fontFamily || '`Consolas`';
		this.fontSizePx = config.fontSizePx || 10;
		this.alphabet = config.alphabet;
		this.onPerformanceUpdate = config.onPerformanceUpdate;

		// The input canvas
		this.canvas = config.canvas;

		// This will be fixed in resize()
		this.asciiWidth = 0;
		this.asciiHeight = 0;

		// The output canvas
		this.tmpCanvas = document.createElement('canvas');
		this.tmpCanvasCtx = this.tmpCanvas.getContext('2d', {
			willReadFrequently: true,
		}) as CanvasRenderingContext2D;
		this.mountOutput();

		// Set canvas sizes
		this.resize();

		// Cleanup function
		this.cleanup = null;
	}

	// Canvas used in drawing the stars
	private canvas: HTMLCanvasElement;
	// Canvas used in transforming the star canvas to grayscale bitmap
	private tmpCanvas: HTMLCanvasElement;
	private tmpCanvasCtx: CanvasRenderingContext2D;
	// Cleanup function
	public cleanup: (() => void) | null;
	// Ascii width
	private asciiWidth: number;
	// Ascii height
	private asciiHeight: number;
	// The characters to use in converting grayscale intensity to ascii
	public alphabet: string;
	// Callback ran every performance update
	private onPerformanceUpdate: (ips: number) => void;
	// Performance monitoring
	private performance: PerformanceInfo = {
		invocations: 0,
	};
	private fontFamily: string;
	private fontSizePx: number;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private asciiOutputElement: HTMLPreElement | never;

	/**
	 * Mount, then return info about created elements
	 */
	public mountOutput() {
		// Create output
		const pre = document.createElement('pre');
		// Set the pre element's style to position absolute and match the canvas size
		pre.style.margin = '0';
		pre.style.width = 'width: 100%';
		pre.style.height = 'height: 100%';
		pre.classList.add('unstyled');

		// Append the pre element after the canvas element
		if (this.canvas.parentNode) {
			this.canvas.parentNode.insertBefore(pre, this.canvas.nextSibling);
		} else {
			throw new Error('no parent node!!!1');
		}

		this.asciiOutputElement = pre;
	}

	/**
	 * Determines the char width/height
	 */
	private getCharSize(): [number, number] {
		const tempcanvas = document.createElement('canvas');
		tempcanvas.style.fontFamily = this.fontFamily;
		tempcanvas.style.fontSize = this.fontSizePx + 'px';
		const tempctx = tempcanvas.getContext('2d') as CanvasRenderingContext2D;
		const charWidth = tempctx.measureText('1').width;
		const charHeight = this.fontSizePx * 1.2; // Assuming line-height is 1.2 times the font size
		return [Math.floor(charWidth), Math.floor(charHeight)];
	}

	/**
	 * Determines and returns the dimensions of the ascii renderer
	 */
	private getAsciiDimensions(): [number, number] {
		const [charWidth, charHeight] = this.getCharSize();
		const preWidth = this.asciiOutputElement.clientWidth;
		const preHeight = this.asciiOutputElement.clientHeight;

		const columns = Math.ceil((preWidth / charWidth) * 0.75);
		const rows = Math.ceil(preHeight / charHeight);

		// console.log('new ascii: %s', columns * rows);
		return [columns, rows];
	}

	/**
	 * Begins all intervals and sets a cleanup function
	 */
	public startRenderingSequence(fps: number) {
		const clearIntervals = [this.beginTransformationInterval(fps), this.beginPerformanceInterval()];

		this.cleanup = function () {
			for (let i = 0; i < clearIntervals.length; i++) {
				clearIntervals[i]();
			}
		};
	}

	/**
	 * Resizes the output
	 */
	public resize() {
		this.asciiOutputElement.innerText = '';
		const [width, height] = this.getAsciiDimensions();
		this.asciiWidth = width;
		this.asciiHeight = height;
		this.tmpCanvas.width = this.canvas.width;
		this.tmpCanvas.height = this.canvas.height;
	}

	/**
	 * Stops the rendering sequence
	 */
	public stopRenderingSequence() {
		if (this.cleanup) {
			// console.log('stopping rendering cycles');

			this.cleanup();
			this.cleanup = null;
		}
	}

	/**
	 * Runs the given callback at the given fps
	 */
	private asInterval(callback: () => void, fps: number): () => void {
		const interval = setInterval(() => {
			callback();
		}, 1000 / fps);

		return () => clearInterval(interval);
	}

	/**
	 * Begins the ascii transformation interval
	 */
	private beginTransformationInterval(fps: number): () => void {
		return this.asInterval(() => {
			this.performance.invocations++;
			this.canvasToAscii();
		}, fps);
	}

	/**
	 * Begins the performance interval
	 */
	private beginPerformanceInterval(): () => void {
		const interval = setInterval(() => {
			this.onPerformanceUpdate(this.performance.invocations);

			this.performance.invocations = 0;
		}, 1000);

		return () => clearInterval(interval);
	}

	/**
	 * Convert canvas image to ascii art based on brightness
	 */
	private canvasToAscii(): void {
		this.tmpCanvasCtx.clearRect(0, 0, this.asciiWidth, this.asciiHeight);
		this.tmpCanvasCtx.drawImage(this.canvas, 0, 0, this.asciiWidth, this.asciiHeight);

		let asciiArt = '';

		// Get all pixel data at once
		// Use a typed array for any potential performance optimizations, and to guarantee
		// values are 0-255
		const imageData = new Uint8ClampedArray(
			this.tmpCanvasCtx.getImageData(0, 0, this.asciiWidth, this.asciiHeight).data,
		);

		// Iterate through the downscaled canvas image and convert each pixel to an ASCII character
		for (let y = 0; y < this.asciiHeight; y++) {
			for (let x = 0; x < this.asciiWidth; x++) {
				const index = (y * this.asciiWidth + x) * 4;
				const grayscale = Math.round(imageData[index + 3]);
				const asciiChar = this.mapGrayscaleToAscii(grayscale);
				asciiArt += asciiChar;
			}
			asciiArt += '\n';
		}

		this.asciiOutputElement.innerText = asciiArt;
	}

	/**
	 * Map grayscale pixel values to ASCII characters
	 */
	private mapGrayscaleToAscii(value: number): string {
		const index = Math.round(((this.alphabet.length - 1) * value) / 255);
		return this.alphabet[index];
	}
}
