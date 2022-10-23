import { PolygonWith } from '../types';
import Line from './Line';

export enum RestrictionType {
  Length,
  Perpendicular,
}

export class Restriction {
  members: PolygonWith<Line>[];

  constructor(members: PolygonWith<Line>[]) {
    this.members = members;
  }

  // apply(): // mousePoint: Point,
  // // direction: 0 | 1,
  // // sourceLines: Line[],
  // // sourcePoint?: Point
  // boolean {
  //   console.error('Restriction class apply method called!');
  //   return false;
  // }
}

export class LengthRestriction extends Restriction {
  length: number;

  constructor(member: PolygonWith<Line>, length: number) {
    super([member]);
    this.length = length;
  }

  // return: 'changed' -- true is 'change was required'
  // apply(): // mousePoint: Point,
  // // direction: 0 | 1,
  // // sourceLines: Line[],
  // // sourcePoint?: Point
  // boolean {
  //   const actualLength = this.members[0].element.length();
  //   if (Math.abs(actualLength - this.length) < 0.01) {
  //     // console.log('length is correct');
  //     return false;
  //   }

  //   console.log(
  //     `adjusting length: expected: ${this.length}, actual: ${actualLength}`
  //   );

  //   // modify length to adjust
  //   const otherDirection = (direction + 1) % 2;
  //   const constantPoint = this.members[0].element.points[direction];
  //   const movingPoint = this.members[0].element.points[otherDirection];

  //   const line = this.members[0].element;

  //   const isSourcePointInLine: boolean = sourcePoint
  //     ? line.points[otherDirection] === sourcePoint
  //     : false;

  //   if (isSourcePointInLine) {
  //     console.log('in line');
  //     const deltaX = mousePoint.x - constantPoint.x;
  //     const deltaY = mousePoint.y - constantPoint.y;
  //     console.log(deltaX, deltaY);

  //     const a = deltaY / deltaX;
  //     const alpha = Math.atan(a);

  //     const newX = this.length * Math.cos(alpha);
  //     const newY = this.length * Math.sin(alpha);
  //     const newPointX =
  //       constantPoint.x + newX * (mousePoint.x < constantPoint.x ? -1 : 1);
  //     const newPointY =
  //       constantPoint.y + newY * (mousePoint.x < constantPoint.x ? -1 : 1);
  //     movingPoint.x = newPointX;
  //     movingPoint.y = newPointY;
  //   } else {
  //     console.log('NOT in line');
  //     const { dX, dY } = aToXY(line.calculateA(), this.length);
  //     const newPointX = constantPoint.x + dX;
  //     const newPointY = constantPoint.y + dY;
  //     movingPoint.x = newPointX;
  //     movingPoint.y = newPointY;
  //   }

  //   // const facingDown = movingPoint.y > constantPoint.y;
  //   // console.log('facingDown:', facingDown);

  //   // const line = this.members[0].element;
  //   // console.log('start point not in line!', direction);
  //   // let { dX, dY } = aToXY(line.calculateAB().a, this.length);
  //   // console.log('a', line.calculateAB().a);
  //   // console.log('x,y', dX, dY);
  //   // const newPointX = constantPoint.x + dX;
  //   // const newPointY = constantPoint.y + dY;
  //   // //+ Math.abs(dY) * (facingDown ? 1 : -1);
  //   // console.log('new point', newPointX, newPointY);
  //   // movingPoint.x = newPointX;
  //   // movingPoint.y = newPointY;

  //   return true;
  // }
}

export class PerpendicularRestriction extends Restriction {
  a: [number, number] | undefined;

  constructor(member1: PolygonWith<Line>, member2: PolygonWith<Line>) {
    super([member1, member2]);
  }

  getA(line: Line): number {
    if (this.members[0].element === line) return this.a![0];
    if (this.members[1].element === line) return this.a![1];
    console.error('getA - invalid line');
    return 0;
  }

  setA(from: Line, value: number): boolean {
    //return: error
    // index of 'from' line
    const fromIndex = this.members.findIndex(
      (member) => member.element === from
    );
    const otherIndex = (fromIndex + 1) % 2;

    // check if a is set
    if (this.a) {
      if (Math.abs(this.a[fromIndex] - value) < 0.01) {
        // -> correctly - do nothing
        console.log('a already set, but correct');
        return false;
      } else {
        // -> incorrectly - return error
        console.error('a incorrect!');
        return true;
      }
    }

    // not set ->
    // set
    const otherA = value !== 0 ? -1 / value : 10000;
    if (fromIndex === 0) this.a = [value, otherA];
    else if (fromIndex === 1) this.a = [otherA, value];

    // get all restrictions of other member and set A
    for (const r of this.members[otherIndex].element.restrictions.filter(
      (r) => r instanceof PerpendicularRestriction && r !== this
    ) as PerpendicularRestriction[]) {
      r.setA(this.members[otherIndex].element, otherA);
    }
    console.log('set a recursively');
    return false;
  }

  // apply(): // mousePoint: Point,
  // // direction: 0 | 1,
  // // sourceLines: Line[],
  // // sourcePoint?: Point
  // boolean {
  //   let startMember: 0 | 1 = 0;
  //   if (sourceLines.find((line) => line === this.members[1].element))
  //     startMember = 1;

  //   const otherMember = this.members[startMember === 0 ? 1 : 0];

  //   // console.log('startMember', startMember);

  //   const a1 = this.members[startMember].element.calculateA();
  //   const a2Current = otherMember.element.calculateA();
  //   const a2New = -1 / a1;

  //   if (Math.abs(a2Current - a2New) < 0.01) {
  //     // console.log('perpendicularity is correct');
  //     return false;
  //   }

  //   if (a2New === Infinity && a2Current > 200) {
  //     // console.log('perpendicularity is correct -- +Infinity');
  //     return false;
  //   }

  //   if (a2New === -Infinity && a2Current < -200) {
  //     // console.log('perpendicularity is correct -- -Infinity');
  //     return false;
  //   }

  //   if (
  //     (a2New === -Infinity && a2Current === Infinity) ||
  //     (a2New === Infinity && a2Current === -Infinity)
  //   ) {
  //     console.log('perpendicularity is correct -- opposite infinities');
  //     return false;
  //   }

  //   console.log(`adjusting angle: expected: ${a2New}, actual: ${a2Current}`);

  //   // modify angle to adjust
  //   const constantPoint = otherMember.element.points[0];
  //   const movingPoint = otherMember.element.points[1];
  //   // const facingDown = movingPoint.y > constantPoint.y;

  //   const { dX, dY } = aToXY(a2New, otherMember.element.length());
  //   movingPoint.x = constantPoint.x + dX;
  //   movingPoint.y = constantPoint.y + dY;

  //   return true;
  // }
}

// function aToXY(a: number, length: number): { dX: number; dY: number } {
//   const alpha = Math.atan(a);
//   const dX = length * Math.cos(alpha);
//   const dY = length * Math.sin(alpha);
//   return { dX, dY };
// }
