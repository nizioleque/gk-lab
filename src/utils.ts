import Line from './class/Line';
import Point from './class/Point';
import Polygon from './class/Polygon';
import { DrawState } from './types';

export const randomColor = () =>
  `rgba(${Math.floor(Math.random() * 156) + 100}, ${
    Math.floor(Math.random() * 156) + 100
  }, ${Math.floor(Math.random() * 156) + 100})`;

interface Elements {
  polygons: Polygon[];
  lines: Line[];
  points: Point[];
}

export const findHoveredElements = (
  polygons: Polygon[],
  mousePoint: Point
): Elements => {
  const result: Elements = { polygons: [], lines: [], points: [] };

  for (const polygon of polygons) {
    for (const line of polygon.lines) {
      if (line.isAt(mousePoint)) result.lines.push(line);
    }
  }

  return result;
};

export const canClosePolygon = (drawState: DrawState): boolean => {
  if (!drawState.currentPolygon) return false;
  if (drawState.currentPolygon.lines.length <= 1) return false;
  return true;
};
