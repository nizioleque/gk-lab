import { accentColor, lineWidth } from '../theme';
import { distSq, middleOfLine } from '../utils';
import Point from './Point';
import {
  LengthRestriction,
  PerpendicularRestriction,
  Restriction,
  RestrictionType,
} from './Restriction';

const hoverOffset = 3;

export default class Line {
  points: [Point, Point];
  hover: boolean = false;
  restrictions: Restriction[] = [];
  checked: boolean = false;
  isBezierCurve: boolean = false;
  bezierPoints: [Point, Point] | undefined = undefined;

  setBezier() {
    this.isBezierCurve = true;
    const deltaX = this.points[1].x - this.points[0].x;
    const deltaY = this.points[1].y - this.points[0].y;
    const p1 = new Point(deltaX / 3, deltaY / 3, this.points[0], false);
    const p2 = new Point(deltaX / 3, deltaY / 3, this.points[1], true);
    this.bezierPoints = [p1, p2];
  }

  constructor(point1: Point, point2: Point) {
    this.points = [point1, point2];
  }

  setEnd(end: Point) {
    this.points[1] = end;
  }

  setStart(start: Point) {
    this.points[0] = start;
  }

  calculateA(): number {
    return (
      (this.points[0].y - this.points[1].y) /
      (this.points[0].x - this.points[1].x)
    );
  }

  calculateB(a: number): number {
    return this.points[0].y - this.points[0].x * a;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.isBezierCurve) {
      // bezier points
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(
        this.points[0].x + this.bezierPoints![0].x,
        this.points[0].y + this.bezierPoints![0].y,
        6,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(
        this.points[1].x - this.bezierPoints![1].x,
        this.points[1].y - this.bezierPoints![1].y,
        6,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // dashed line
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.setLineDash([8, 8]);
      ctx.moveTo(this.points[0].x, this.points[0].y);
      const absolute1 = this.bezierPoints![0].absolutePosition();
      ctx.lineTo(absolute1.x, absolute1.y);
      const absolute2 = this.bezierPoints![1].absolutePosition();
      ctx.lineTo(absolute2.x, absolute2.y);
      ctx.lineTo(this.points[1].x, this.points[1].y);
      ctx.stroke();

      // draw bezier
      this.drawBezierCurve(ctx);

      // start point
      this.points[0].draw(ctx);
    } else {
      if (this.hover) ctx.strokeStyle = accentColor;
      else ctx.strokeStyle = 'black';
      //ctx.strokeStyle = randomColor();

      ctx.lineWidth = this.hover ? lineWidth + 2 : lineWidth;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);
      ctx.lineTo(this.points[1].x, this.points[1].y);
      ctx.stroke();

      this.points[0].draw(ctx);

      const hasLengthRestriction = this.restrictions.find(
        (r) => r instanceof LengthRestriction
      );
      const hasPerpendicularRestriction = this.restrictions.find(
        (r) => r instanceof PerpendicularRestriction
      );

      if (hasLengthRestriction && hasPerpendicularRestriction) {
        this.drawMarker(ctx, RestrictionType.Length, -10, 0, -15, 5);
        this.drawMarker(ctx, RestrictionType.Perpendicular, 10, 0, 5, 5);
      } else if (hasLengthRestriction) {
        this.drawMarker(ctx, RestrictionType.Length, 0, 0, -5, 5);
      } else if (hasPerpendicularRestriction) {
        this.drawMarker(ctx, RestrictionType.Perpendicular, 0, 0, -5, 5);
      }
    }
  }

  drawBezierCurve(ctx: CanvasRenderingContext2D) {
    const v0 = this.points[0];
    const v1 = this.bezierPoints![0].absolutePoint();
    const v2 = this.bezierPoints![1].absolutePoint();
    const v3 = this.points[1];

    const a0 = v0;
    const a1 = Point.multiply(Point.subtract(v1, v0), 3);
    const a2 = Point.multiply(
      Point.add(Point.subtract(v2, Point.multiply(v1, 2)), v0),
      3
    );
    let a3 = Point.subtract(v3, Point.multiply(v2, 3));
    a3 = Point.add(a3, Point.multiply(v1, 3));
    a3 = Point.subtract(a3, v0);

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'blue';
    ctx.setLineDash([]);
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let t = 0; t <= 1; t += 0.05) {
      const point = Line.getBezierFuncVal(t, a0, a1, a2, a3);
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(this.points[1].x, this.points[1].y);
    ctx.stroke();
  }

  static getBezierFuncVal(
    t: number,
    a0: Point,
    a1: Point,
    a2: Point,
    a3: Point
  ): Point {
    let res = a3;
    res = Point.add(Point.multiply(res, t), a2);
    res = Point.add(Point.multiply(res, t), a1);
    res = Point.add(Point.multiply(res, t), a0);
    return res;
  }

  drawMarker(
    ctx: CanvasRenderingContext2D,
    type: RestrictionType,
    xOffset: number,
    yOffset: number,
    textXOffset: number,
    textYOffset: number
  ) {
    const middlePoint = middleOfLine(this);
    // ctx.strokeStyle = type === RestrictionType.Length ? 'red' : 'lime';
    ctx.fillStyle = type === RestrictionType.Length ? '#e57171' : '#61cc61';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(
      middlePoint.x + xOffset,
      middlePoint.y + yOffset,
      9,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial Black';
    ctx.fillText(
      type === RestrictionType.Length ? 'D' : 'P',
      middlePoint.x + textXOffset,
      middlePoint.y + textYOffset
    );
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

  length(): number {
    return Math.sqrt(distSq(this.points[0], this.points[1]));
  }

  // return: error
  applyRestrictions(nextLine: Line): boolean {
    // calculate current 'a'
    const currentA = this.calculateA();
    let error = false;

    // filter per. rest. and length rest.
    const perpendicularRestrictions = this.restrictions.filter(
      (r) => r instanceof PerpendicularRestriction
    ) as PerpendicularRestriction[];
    const lengthRestriction = this.restrictions.find(
      (r) => r instanceof LengthRestriction
    ) as LengthRestriction;

    if (perpendicularRestrictions.length > 0) {
      let applyA = currentA;

      // check if 1st per.rest. has 'a'
      if (perpendicularRestrictions[0].a) {
        applyA = perpendicularRestrictions[0].getA(this);
      }

      // if not ->
      else {
        // loop through all restrictions recursively and set 'a'
        // -> if 'a' is already set and incorrect, return error
        for (const r of perpendicularRestrictions) {
          const ret = r.setA(this, currentA);
          if (ret) {
            error = true;
          }
        }
      }

      // apply 'a' (from per.rest. or calculated)
      if (Math.abs(currentA - applyA) > 0.01) {
        this.applyA(applyA, nextLine);
      }
    }

    // apply length rest.
    if (
      lengthRestriction &&
      Math.abs(lengthRestriction.length - this.length()) > 0.01
    ) {
      this.applyLength(lengthRestriction.length);
    }

    return error;
  }

  applyA(a: number, nextLine: Line) {
    const nextA = nextLine.calculateA();
    const nextB = nextLine.calculateB(nextA);

    // calculate a, b
    const b = this.calculateB(a);

    // find intersection point of current and next line
    const newX = (nextB - b) / (a - nextA);
    const newY = a * newX + b;

    this.points[1].x = newX;
    this.points[1].y = newY;
  }

  applyLength(length: number, reverse: boolean = false) {
    // calculate a (proportion)
    const ratio = length / this.length();

    // multiply deltaX, deltaY by proportion
    let x = this.points[1].x - this.points[0].x;
    let y = this.points[1].y - this.points[0].y;

    x *= ratio;
    y *= ratio;

    if (!reverse) {
      // add deltaX, deltaY to 1st point
      x += this.points[0].x;
      y += this.points[0].y;

      // apply to 2nd point
      this.points[1].x = x;
      this.points[1].y = y;
    } else {
      x *= -1;
      y *= -1;

      x += this.points[1].x;
      y += this.points[1].y;

      this.points[0].x = x;
      this.points[0].y = y;
    }
  }
}
