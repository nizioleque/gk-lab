import { PolygonWith } from '../types';
import Line from './Line';
import Point from './Point';

export enum RestrictionType {
  Length,
  Perpendicular,
}

export class Restriction {
  // type: RestrictionType;
  // members: [PolygonWith<Line>, PolygonWith<Line> | undefined];
  members: PolygonWith<Line>[];

  constructor(members: PolygonWith<Line>[]) {
    this.members = members;
  }

  otherMember(member: PolygonWith<Line>): PolygonWith<Line> | undefined {
    return member === this.members[1] ? this.members[0] : this.members?.[1];
  }

  apply(mousePoint: Point, startPoint?: Point): boolean {
    return false;
  }
}

export class LengthRestriction extends Restriction {
  length: number;

  constructor(member: PolygonWith<Line>, length: number) {
    super([member]);
    this.length = length;
  }

  apply(mousePoint: Point, startPoint?: Point): boolean {
    const actualLength = this.members[0].element.length();
    if (Math.abs(actualLength - this.length) < 0.01) {
      console.log('length is correct');
      return false;
    }

    console.log(
      `adjusting length: expected: ${this.length}, actual: ${actualLength}`
    );

    // modify length to adjust
    const line = this.members[0].element;
    const isStartPointInLine: boolean = startPoint
      ? line.points.includes(startPoint)
      : false;

    if (isStartPointInLine) {
      let dragPointIndex: number = line.points.indexOf(startPoint!);
      const constantPointIndex = (dragPointIndex + 1) % 2;
      const constantPoint = line.points[constantPointIndex];
      console.log('start point in line!', dragPointIndex, constantPointIndex);

      const deltaX = mousePoint.x - constantPoint.x;
      const deltaY = mousePoint.y - constantPoint.y;

      const a = deltaY / deltaX;
      const alpha = Math.atan(a);

      const newX = this.length * Math.cos(alpha);
      const newY = this.length * Math.sin(alpha);
      const newPointX =
        line.points[constantPointIndex].x +
        newX * (mousePoint.x < constantPoint.x ? -1 : 1);
      const newPointY =
        line.points[constantPointIndex].y +
        newY * (mousePoint.x < constantPoint.x ? -1 : 1);
      line.points[dragPointIndex].x = newPointX;
      line.points[dragPointIndex].y = newPointY;
    } else {
      const startPointIndex = 0;
      console.log('start point not in line!', startPointIndex);
      const otherPointIndex = (startPointIndex + 1) % 2;
      const alpha = Math.atan(line.a);
      const newX = this.length * Math.cos(alpha);
      const newY = this.length * Math.sin(alpha);
      const newPointX =
        line.points[startPointIndex].x +
        newX * (otherPointIndex === 0 ? -1 : 1);
      const newPointY =
        line.points[startPointIndex].y +
        newY * (otherPointIndex === 0 ? -1 : 1);
      line.points[otherPointIndex].x = newPointX;
      line.points[otherPointIndex].y = newPointY;
    }

    return true;
  }
}

export class PerpendicularRestriction extends Restriction {
  constructor(member1: PolygonWith<Line>, member2: PolygonWith<Line>) {
    super([member1, member2]);
  }

  apply(): boolean {
    return false;
  }
}

export class RestrictionData {
  restrictions: Restriction[] = [];

  add(
    // type: RestrictionType,
    restriction: Restriction
    // member1: PolygonWith<Line>,
    // member2?: PolygonWith<Line>
  ) {
    // const newRestriction = new Restriction(type, member1, member2);
    // let newRestriction = this.restrictions.push(newRestriction);
    this.restrictions.push(restriction);
    restriction.members[0].element.restrictions.push(restriction);
    restriction.members[1]?.element.restrictions.push(restriction);
  }

  delete(restriction: Restriction) {
    restriction.members[0].element.restrictions =
      restriction.members[0].element.restrictions.filter(
        (r) => r !== restriction
      );
    if (restriction.members[1]) {
      restriction.members[1].element.restrictions =
        restriction.members[1].element.restrictions.filter(
          (r) => r !== restriction
        );
    }
    this.restrictions = this.restrictions.filter((r) => r !== restriction);
  }

  applyAll(mousePoint: Point, startPoint?: Point): boolean {
    let iters = 0;

    while (true) {
      let changed = false;

      for (const restriction of this.restrictions) {
        const result = restriction.apply(mousePoint, startPoint);
        if (result) changed = true;
      }

      if (!changed) {
        console.log(`no change after ${iters} iterations -- success`);
        return true;
      }

      if (iters++ > 100) {
        console.error('exceeded 100 iterations');
        return false;
      }
    }
  }
}
