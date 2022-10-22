import { PolygonWith } from '../types';
import Line from './Line';

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

  apply(): boolean {
    return false;
  }
}

export class LengthRestriction extends Restriction {
  length: number;

  constructor(member: PolygonWith<Line>, length: number) {
    super([member]);
    this.length = length;
  }

  apply(): boolean {
    // const length = this.members[0].element.length();
    return false;
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

  applyAll(): boolean {
    let iters = 0;

    while (true) {
      let changed = false;
      for (const restriction of this.restrictions) {
        const result = restriction.apply();
        if (result) changed = true;
      }
      if (!changed) {
        console.log('no change -- success');
        return true;
      }

      if (iters++ > 100) {
        console.error('exceeded 100 iterations');
        return false;
      }
    }
  }
}
