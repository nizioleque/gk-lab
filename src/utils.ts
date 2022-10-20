import Line from './class/Line';
import Point from './class/Point';
import Polygon from './class/Polygon';
import { DrawState, HoveredElement } from './types';

export const randomColor = () =>
  `rgba(${Math.floor(Math.random() * 156) + 100}, ${
    Math.floor(Math.random() * 156) + 100
  }, ${Math.floor(Math.random() * 156) + 100})`;

export const findHoveredLines = (
  polygons: Polygon[],
  mousePoint: Point
): HoveredElement<Line>[] => {
  const result: HoveredElement<Line>[] = [];

  for (const polygon of polygons) {
    for (const line of polygon.lines) {
      if (line.isAt(mousePoint)) result.push({ polygon, element: line });
    }
  }

  return result;
};

export const findHoveredPoints = (
  polygons: Polygon[],
  mousePoint: Point
): HoveredElement<Point>[] => {
  const result: HoveredElement<Point>[] = [];

  for (const polygon of polygons) {
    for (const line of polygon.lines) {
      const point = line.points[0];
      if (point.isAt(mousePoint)) result.push({ polygon, element: point });
    }
  }

  return result;
};

export const canClosePolygon = (drawState: DrawState): boolean => {
  if (!drawState.currentPolygon) return false;
  if (drawState.currentPolygon.lines.length <= 1) return false;
  return true;
};

export const distSq = (point1: Point, point2: Point): number => {
  return Math.pow(point1.y - point2.y, 2) + Math.pow(point1.x - point2.x, 2);
};
