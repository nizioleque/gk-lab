import { LengthRestriction, Restriction } from './Restriction';

export default class RestrictionData {
  restrictions: Restriction[] = [];

  add(restriction: Restriction): boolean {
    // return: error
    if (
      restriction instanceof LengthRestriction &&
      restriction.members[0].element.restrictions.find(
        (r) => r instanceof LengthRestriction
      )
    ) {
      // this element already contains a length restriction, error
      return true;
    }

    this.restrictions.push(restriction);
    restriction.members[0].element.restrictions.push(restriction);
    restriction.members[1]?.element.restrictions.push(restriction);
    return false;
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
