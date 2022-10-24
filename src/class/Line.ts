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
    if (this.hover) ctx.strokeStyle = accentColor;
    else ctx.strokeStyle = 'black';
    //ctx.strokeStyle = randomColor();

    ctx.lineWidth = this.hover ? lineWidth + 2 : lineWidth;
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

    // const length = this.length();
    // const keepFacingDown =
    //   Math.abs(a) > 1 && this.points[1].y > this.points[0].y;
    // const keepFacingUp = Math.abs(a) > 1 && this.points[1].y < this.points[0].y;

    // calculate a, b
    const b = this.calculateB(a);

    // find intersection point of current and next line
    const newX = (nextB - b) / (a - nextA);
    const newY = a * newX + b;

    this.points[1].x = newX;
    this.points[1].y = newY;

    // // calculate new Y of 2nd point
    // const newY = a * this.points[1].x + b;

    // if (keepFacingDown && newY < this.points[0].y) {
    //   const deltaX = this.points[1].x - this.points[0].x;
    //   this.points[1].x -= 2 * deltaX;
    // } else if (keepFacingUp && newY > this.points[0].y) {
    //   const deltaX = this.points[1].x - this.points[0].x;
    //   this.points[1].x -= 2 * deltaX;
    // } else {
    //   // move 2nd point
    //   this.points[1].y = newY;
    // }

    // // correct length
    // this.applyLength(length);
  }

  applyLength(length: number) {
    // calculate a (proportion)
    const ratio = length / this.length();

    // multiply deltaX, deltaY by proportion
    let x = this.points[1].x - this.points[0].x;
    let y = this.points[1].y - this.points[0].y;

    x *= ratio;
    y *= ratio;

    // add deltaX, deltaY to 1st point
    x += this.points[0].x;
    y += this.points[0].y;

    // apply to 2nd point
    this.points[1].x = x;
    this.points[1].y = y;
  }
}
