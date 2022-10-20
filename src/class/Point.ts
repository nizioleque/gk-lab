const pointRadius = 5;
const hoverOffset = Math.pow(20, 2);

export default class Point {
  x: number;
  y: number;
  hover: boolean = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.hover) ctx.fillStyle = 'red';
    else ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.x, this.y, pointRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  isAt(mousePoint: Point, highlight: boolean = false): boolean {
    const distSq =
      Math.pow(mousePoint.y - this.y, 2) + Math.pow(mousePoint.x - this.x, 2);
    const result = distSq < hoverOffset;
    this.hover = result && highlight;
    return result;
  }
}
