import Line from './Line';
import Point from './Point';
import { LengthRestriction, Restriction } from './Restriction';

export default class RestrictionData {
  restrictions: Restriction[] = [];

  add(restriction: Restriction) {
    this.restrictions.push(restriction);
    restriction.members[0].element.restrictions.push(restriction);
    restriction.members[1]?.element.restrictions.push(restriction);
    restriction.apply(new Point(0, 0), 0, []);
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

  // return : 'success', true is OK
  applyAll(mousePoint: Point, sourceLines: Line[]): boolean {
    let iters = 0;

    let direction = 0;
    if (
      sourceLines[1]?.restrictions.find((r) => r instanceof LengthRestriction)
    )
      direction = 1;

    while (true) {
      let changed = false;

      for (const restriction of this.restrictions) {
        const result = restriction.apply(
          mousePoint,
          direction as 0 | 1,
          sourceLines
        );
        if (result) changed = true;
      }

      if (!changed) {
        console.log(`no change after ${iters} iterations -- success`);
        return true;
      }

      if (iters++ > 10) {
        console.warn('trying other direction');
        while (true) {
          changed = false;

          for (const restriction of this.restrictions) {
            const result = restriction.apply(
              mousePoint,
              direction === 0 ? 1 : 0,
              sourceLines
            );
            if (result) changed = true;
          }

          if (!changed) {
            console.log(`no change after ${iters} iterations -- success`);
            return true;
          }

          if (iters++ > 20) {
            console.error('exceeded 20 iterations');
            return false;
          }
        }
      }
    }
  }
}
