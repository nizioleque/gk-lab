import { randomColor } from '../Canvas';
import Point from './Point';

export default class Line {
  points: [Point, Point];

//   constructor(points: [Point, Point]) {
//     this.points = points;
//   }

  constructor(x1: number, y1: number, x2: number, y2: number) {
    const point1 = new Point(x1, y1);
    const point2 = new Point(x2, y2);
    this.points = [point1, point2];
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = randomColor();
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    ctx.lineTo(this.points[1].x, this.points[1].y);
    ctx.stroke();

    for (const point of this.points) point.draw(ctx);
  }
}
