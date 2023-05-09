export const decay = 0.0125 / 4;
export const propagation = 0.5 * 2;

export class Ripple {
	constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
		this.x = x;
		this.y = y;
		this.radius = 0;
		this.alpha = 1;
		this.ctx = ctx;
	}

	public x: number;
	public y: number;
	public alpha: number;
	public radius: number;
	private ctx: CanvasRenderingContext2D;

	update() {
		this.radius += propagation;
		this.alpha -= decay;
		if (this.alpha < 0) this.alpha = 0;
	}

	draw() {
		const x = this.x;
		const y = this.y;

		const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, this.radius);
		gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
		gradient.addColorStop(0.5, `rgba(255,255,255,${this.alpha})`);
		gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

		this.ctx.lineWidth = 24;
		this.ctx.beginPath();
		this.ctx.arc(x, y, this.radius, 0, Math.PI * 2);
		this.ctx.closePath();
		this.ctx.strokeStyle = gradient;
		this.ctx.stroke();
	}
}
