import { accentColor, pointRadius } from '../theme';
import { distSq } from '../utils';

const hoverOffset = Math.pow(10, 2);

export default class Point {
  x: number;
  y: number;
  hover: boolean = false;
  relativeTo?: Point;
  negative?: boolean;

  constructor(x: number, y: number, relativeTo?: Point, negative?: boolean) {
    this.x = x;
    this.y = y;
    this.relativeTo = relativeTo;
    this.negative = negative;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.hover) ctx.fillStyle = accentColor;
    else ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.x, this.y, pointRadius + (this.hover ? 2 : 0), 0, Math.PI * 2);
    ctx.fill();
  }

  isAt(mousePoint: Point, highlight: boolean = false): boolean {
    const { x, y } = this.absolutePosition();

    const distance = distSq(new Point(x, y), mousePoint);
    const result = distance < hoverOffset;
    this.hover = result && highlight;
    return result;
  }

  absolutePosition(): { x: number; y: number } {
    let x = this.x;
    let y = this.y;
    if (this.relativeTo) {
      if (this.negative) {
        x = this.relativeTo.x - x;
        y = this.relativeTo.y - y;
      } else {
        x += this.relativeTo.x;
        y += this.relativeTo.y;
      }
    }
    return { x, y };
  }

  absolutePoint(): Point {
    const { x, y } = this.absolutePosition();
    return new Point(x, y);
  }

  static add(p1: Point, p2: Point) {
    return new Point(p1.x + p2.x, p1.y + p2.y);
  }

  static subtract(p1: Point, p2: Point) {
    return new Point(p1.x - p2.x, p1.y - p2.y);
  }

  static multiply(p1: Point, times: number) {
    return new Point(p1.x * times, p1.y * times);
  }
}
