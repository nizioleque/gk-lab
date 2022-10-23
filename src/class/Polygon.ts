import Line from './Line';
import { PerpendicularRestriction } from './Restriction';
import RestrictionData from './RestrictionData';

export default class Polygon {
  lines: Line[];

  constructor(lines: Line[]) {
    this.lines = lines;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    for (const line of this.lines) {
      line.draw(ctx);
    }
    this.lines[0].points[0].draw(ctx);
  }

  highlightAll(): void {
    for (const line of this.lines) {
      line.hover = true;
      line.points[0].hover = true;
    }
  }

  // return: error
  static applyRestrictions(
    polygons: Polygon[],
    restrictionData: RestrictionData,
    startLines: Line[]
  ): boolean {
    let error = false;

    // reset calculated a's
    for (const r of restrictionData.restrictions.filter(
      (r) => r instanceof PerpendicularRestriction
    ) as PerpendicularRestriction[]) {
      r.a = undefined;
    }

    // calculate a's for start lines
    for (const line of startLines) {
      const a = line.calculateA();
      for (const r of line.restrictions.filter(
        (r) => r instanceof PerpendicularRestriction
      ) as PerpendicularRestriction[]) {
        r.setA(line, a);
      }
    }

    // apply restrictions
    for (const polygon of polygons) {
      for (const line of polygon.lines) {
        const ret = line.applyRestrictions();
        if (ret) error = true;
      }
    }

    return error;
  }
}
