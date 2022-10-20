import Line from './class/Line';
import Point from './class/Point';
import Polygon from './class/Polygon';

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
      console.log('checking line:', line);
      if (line.isAt(mousePoint)) result.lines.push(line);
    }
  }

  console.log(result);

  return result;
};