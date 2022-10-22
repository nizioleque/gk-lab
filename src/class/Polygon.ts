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
}
