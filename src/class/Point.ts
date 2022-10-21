import { accentColor, pointRadius } from '../theme';
import { distSq } from '../utils';

const hoverOffset = Math.pow(10, 2);

export default class Point {
  x: number;
  y: number;
  hover: boolean = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.hover) ctx.fillStyle = accentColor;
    else ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.x, this.y, pointRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  isAt(mousePoint: Point, highlight: boolean = false): boolean {
    const distance = distSq(new Point(this.x, this.y), mousePoint);
    const result = distance < hoverOffset;
    this.hover = result && highlight;
    return result;
  }
}
