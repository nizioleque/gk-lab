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
      // this element already contains a restriction, error
      return true;
    }

    this.restrictions.push(restriction);
    restriction.members[0].element.restrictions.push(restriction);
    restriction.members[1]?.element.restrictions.push(restriction);
    // restriction.apply(new Point(0, 0), 0, []);
    // TODO apply after adding!
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

  // // return : 'success', true is OK
  // applyAll(
  //   mousePoint: Point,
  //   sourceLines: Line[],
  //   sourcePoint?: Point
  // ): boolean {
  //   let iters = 0;

  //   let direction = 1;
  //   if (
  //     sourceLines[1]?.restrictions.find((r) => r instanceof LengthRestriction)
  //   )
  //     direction = 0;

  //   while (true) {
  //     let changed = false;

  //     for (const restriction of this.restrictions) {
  //       const result = restriction.apply(
  //         mousePoint,
  //         direction as 0 | 1,
  //         sourceLines,
  //         sourcePoint
  //       );
  //       if (result) changed = true;
  //     }

  //     if (!changed) {
  //       console.log(`no change after ${iters} iterations -- success`);
  //       return true;
  //     }

  //     if (iters++ > 10) {
  //       console.warn('trying other direction');
  //       while (true) {
  //         changed = false;

  //         for (const restriction of this.restrictions) {
  //           const result = restriction.apply(
  //             mousePoint,
  //             direction === 0 ? 1 : 0,
  //             sourceLines,
  //             sourcePoint
  //           );
  //           if (result) changed = true;
  //         }

  //         if (!changed) {
  //           console.log(`no change after ${iters} iterations -- success`);
  //           return true;
  //         }

  //         if (iters++ > 20) {
  //           console.error('exceeded 20 iterations');
  //           return false;
  //         }
  //       }
  //     }
  //   }
  // }
}
