import Point from './Point';
import { Restriction } from './Restriction';

export default class RestrictionData {
  restrictions: Restriction[] = [];

  add(restriction: Restriction) {
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
