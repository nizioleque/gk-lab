import { randomColor } from '../utils';
import Point from './Point';

const hoverOffset = 20;

export default class Line {
  points: [Point, Point];
  a: number;
  b: number;
  hover: boolean = false;

  constructor(point1: Point, point2: Point) {
    const lPt = point1.x < point2.x ? point1 : point2;
    const rPt = lPt === point1 ? point2 : point1;
    this.points = [lPt, rPt];
    this.a = (rPt.y - lPt.y) / (rPt.x - lPt.x);
    this.b = rPt.y - lPt.x * this.a;
    console.log(point1, point2, lPt, rPt, this.a, this.b);
  }

  // constructor(x1: number, y1: number, x2: number, y2: number) {
  //   const point1 = new Point(x1, y1);
  //   const point2 = new Point(x2, y2);
  //   this.points = [point1, point2];
  // }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.hover) ctx.strokeStyle = 'red';
    else ctx.strokeStyle = randomColor();
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    ctx.lineTo(this.points[1].x, this.points[1].y);
    ctx.stroke();

    // for (const point of this.points) point.draw(ctx);
    this.points[0].draw(ctx);
  }

  isAt(mousePoint: Point): boolean {
    // console.log(this.points, this.a, this.b);
    if (mousePoint.x < this.points[0].x - hoverOffset) return false;
    if (mousePoint.x > this.points[1].x + hoverOffset) return false;
    const expectedY = this.a * mousePoint.x + this.b;
    if (Math.abs(mousePoint.y - expectedY) > hoverOffset) return false;
    // console.log('AAAAAAAAAAA');
    return true;
  }
}
