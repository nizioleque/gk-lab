import Line from './Line';

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

  // applyRestrictions(
  //   startLine: Line = this.lines[0],
  //   startPoint: Point = this.lines[0].points[0]
  // ): { changed: boolean; error: boolean } {
  //   const startLineIndex = this.lines.indexOf(startLine);
  //   const startPointIndex = startLine.points.indexOf(startPoint);
  //   let changed = false;
  //   let error = false;

  //   console.log(
  //     'apply restrictions polygon',
  //     this,
  //     startLineIndex,
  //     startPointIndex
  //   );

  //   for (let i = 0; i < this.lines.length; i++) {
  //     const changedLine =
  //       this.lines[(startLineIndex + i) % this.lines.length].applyRestrictions(
  //         startPointIndex
  //       );
  //     if (changedLine) changed = true;
  //   }

  //   return { changed, error };
  // }
}
