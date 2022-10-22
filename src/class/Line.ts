import { accentColor, lineWidth } from '../theme';
import { distSq, middleOfLine, randomColor } from '../utils';
import Point from './Point';
import { Restriction, RestrictionType } from './Restriction';

const hoverOffset = 3;

export default class Line {
  points: [Point, Point];
  a: number = 0;
  b: number = 0;
  hover: boolean = false;
  restrictions: Restriction[] = [];

  constructor(point1: Point, point2: Point) {
    this.points = [point1, point2];
    this.calculateAB();
  }

  setEnd(end: Point) {
    this.points[1] = end;
    this.calculateAB();
  }

  setStart(start: Point) {
    this.points[0] = start;
    this.calculateAB();
  }

  calculateAB() {
    const [point1, point2] = this.points;
    const lPt = point1.x < point2.x ? point1 : point2;
    const rPt = lPt === point1 ? point2 : point1;
    this.a = (rPt.y - lPt.y) / (rPt.x - lPt.x);
    this.b = rPt.y - rPt.x * this.a;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.hover) ctx.strokeStyle = accentColor;
    // ctx.strokeStyle = 'black';
    else ctx.strokeStyle = randomColor();

    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    ctx.lineTo(this.points[1].x, this.points[1].y);
    ctx.stroke();

    this.points[0].draw(ctx);

    if (this.restrictions.find((r) => r.type === RestrictionType.Length)) {
      const middlePoint = middleOfLine(this);
      ctx.strokeStyle = 'red';
      ctx.fillStyle = 'red';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(middlePoint.x - 10, middlePoint.y, 10, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.font = '16px Arial Black';
      ctx.fillText('D', middlePoint.x - 16, middlePoint.y + 5);
    }
    if (
      this.restrictions.find((r) => r.type === RestrictionType.Perpendicular)
    ) {
      const middlePoint = middleOfLine(this);
      ctx.strokeStyle = 'lime';
      ctx.fillStyle = 'lime';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(middlePoint.x + 10, middlePoint.y, 10, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.font = '16px Arial Black';
      ctx.fillText('P', middlePoint.x + 4, middlePoint.y + 5);
    }
  }

  isAt(mousePoint: Point, highlight: boolean = false): boolean {
    let result: boolean | undefined = undefined;

    const [point1, point2] = this.points;
    const lPt = point1.x < point2.x ? point1 : point2;
    const rPt = lPt === point1 ? point2 : point1;
    if (mousePoint.x < lPt.x - hoverOffset) result = false;
    if (mousePoint.x > rPt.x + hoverOffset) result = false;

    if (result === undefined) {
      const uPt = point1.y < point2.y ? point1 : point2;
      const dPt = uPt === point1 ? point2 : point1;
      if (mousePoint.y < uPt.y - hoverOffset) result = false;
      if (mousePoint.y > dPt.y + hoverOffset) result = false;
    }

    if (result === undefined) {
      const lineLength = Math.sqrt(distSq(this.points[0], this.points[1]));
      const dist0 = Math.sqrt(distSq(this.points[0], mousePoint));
      const dist1 = Math.sqrt(distSq(this.points[1], mousePoint));
      result = dist0 + dist1 <= lineLength + 0.5;
    }

    this.hover = highlight && result;
    return result;
  }
}
