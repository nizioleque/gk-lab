import { PolygonWith } from '../types';
import Line from './Line';

export enum RestrictionType {
  Length,
  Perpendicular,
}

export class Restriction {
  type: RestrictionType;
  members: [PolygonWith<Line>, PolygonWith<Line> | undefined];

  constructor(
    type: RestrictionType,
    member1: PolygonWith<Line>,
    member2?: PolygonWith<Line>
  ) {
    this.type = type;
    this.members = [member1, member2];
  }

  otherMember(member: PolygonWith<Line>): PolygonWith<Line> | undefined {
    return member === this.members[1] ? this.members[0] : this.members?.[1];
  }
}

export default class RestrictionData {
  restrictions: Restriction[] = [];

  add(
    type: RestrictionType,
    member1: PolygonWith<Line>,
    member2?: PolygonWith<Line>
  ) {
    const newRestriction = new Restriction(type, member1, member2);
    this.restrictions.push(newRestriction);
    member1.element.restrictions.push(newRestriction);
    member2?.element.restrictions.push(newRestriction);
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
}
