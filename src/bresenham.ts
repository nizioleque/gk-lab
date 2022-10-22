import Point from './class/Point';
import Polygon from './class/Polygon';

export default function bresenham(
  canvas: HTMLCanvasElement,
  polygons: Polygon[]
) {
  for (const polygon of polygons) {
    for (const line of polygon.lines) {
      line.points[0].x = Math.round(line.points[0].x);
      line.points[0].y = Math.round(line.points[0].y);
    }
  }

  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';

  for (const polygon of polygons) {
    for (const line of polygon.lines) {
      calcStraightLine(ctx, line.points[0], line.points[1]);
    }
  }
}

function calcStraightLine(
  ctx: CanvasRenderingContext2D,
  start: Point,
  end: Point
) {
  let x1 = start.x;
  let y1 = start.y;
  const x2 = end.x;
  const y2 = end.y;
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;
  ctx.fillRect(x1, y1, 1, 1);
  while (!(x1 == x2 && y1 == y2)) {
    var e2 = err << 1;
    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
    ctx.fillRect(x1, y1, 1, 1);
  }
}
