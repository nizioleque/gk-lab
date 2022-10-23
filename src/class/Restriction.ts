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
}

export class LengthRestriction extends Restriction {
  length: number;

  constructor(member: PolygonWith<Line>, length: number) {
    super([member]);
    this.length = length;
  }
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
}
