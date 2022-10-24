import Line from './Line';
import { LengthRestriction, PerpendicularRestriction } from './Restriction';
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
    startPolygon?: Polygon,
    startLines?: Line[]
  ): boolean {
    let error = false;

    // reset calculated a's
    for (const r of restrictionData.restrictions.filter(
      (r) => r instanceof PerpendicularRestriction
    ) as PerpendicularRestriction[]) {
      r.a = undefined;
    }

    // calculate a's for start lines
    for (const line of startLines ?? []) {
      const restrictions = line.restrictions.filter(
        (r) => r instanceof PerpendicularRestriction
      ) as PerpendicularRestriction[];
      if (restrictions.length > 0) {
        const a = line.calculateA();
        for (const r of restrictions) {
          const ret = r.setA(line, a);
          if (ret) error = true;
        }
        break;
      }
    }

    // first apply restrictions to the current polygon
    const otherPolygons = polygons.filter((p) => p !== startPolygon);

    if (startPolygon && startLines && startLines.length > 0) {
      const startLineIndex = startPolygon.lines.findIndex(
        (line) => line === startLines[0]
      );
      for (let i = 0; i < startPolygon.lines.length; i++) {
        const line =
          startPolygon.lines[(startLineIndex + i) % startPolygon.lines.length];
        const nextLine =
          startPolygon.lines[
            (startLineIndex + i + 1) % startPolygon.lines.length
          ];
        const ret = line.applyRestrictions(nextLine);
        if (ret) error = true;
      }
    }

    // apply restrictions to other polygons
    for (const polygon of otherPolygons) {
      for (let i = 0; i < polygon.lines.length; i++) {
        const line = polygon.lines[i % polygon.lines.length];
        const nextLine = polygon.lines[(i + 1) % polygon.lines.length];
        const ret = line.applyRestrictions(nextLine);
        if (ret) error = true;
      }
    }

    // apply length restrictions in reverse
    for (let i = polygons.length - 1; i >= 0; i--) {
      const lines = polygons[i].lines;
      for (let j = lines.length - 1; j >= 0; j--) {
        const lengthRestriction = lines[j].restrictions.find(
          (r) => r instanceof LengthRestriction
        ) as LengthRestriction;
        if (lengthRestriction) {
          if (Math.abs(lengthRestriction.length - lines[j].length()) > 0.01) {
            lines[j].applyLength(lengthRestriction.length);
          }
        }
      }
    }

    return error;
  }
}
