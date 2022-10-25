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
      plotLine(ctx, line.points[0], line.points[1]);
    }
  }
}

function plotLineLow(ctx: CanvasRenderingContext2D, p1: Point, p2: Point) {
  const dX = p2.x - p1.x;
  let dY = p2.y - p1.y;
  let yi = 1;
  if (dY < 0) {
    yi *= -1;
    dY *= -1;
  }
  let D = 2 * dY - dX;
  let y = p1.y;

  for (let x = p1.x; x <= p2.x; x++) {
    ctx.fillRect(x, y, 1, 1);
    if (D > 0) {
      y += yi;
      D += 2 * (dY - dX);
    } else {
      D += 2 * dY;
    }
  }
}

function plotLineHigh(ctx: CanvasRenderingContext2D, p1: Point, p2: Point) {
  let dX = p2.x - p1.x;
  const dY = p2.y - p1.y;
  let xi = 1;
  if (dX < 0) {
    xi *= -1;
    dX *= -1;
  }
  let D = 2 * dX - dY;
  let x = p1.x;

  for (let y = p1.y; y <= p2.y; y++) {
    ctx.fillRect(x, y, 1, 1);
    if (D > 0) {
      x += xi;
      D += 2 * (dX - dY);
    } else {
      D += 2 * dX;
    }
  }
}

function plotLine(ctx: CanvasRenderingContext2D, p1: Point, p2: Point) {
  if (Math.abs(p2.y - p1.y) < Math.abs(p2.x - p1.x)) {
    if (p1.x > p2.x) plotLineLow(ctx, p2, p1);
    else plotLineLow(ctx, p1, p2);
  } else {
    if (p1.y > p2.y) plotLineHigh(ctx, p2, p1);
    else plotLineHigh(ctx, p1, p2);
  }
}
