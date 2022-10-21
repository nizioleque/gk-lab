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

export function removeLine(hoveredElement: HoveredElement<Line>) {
  // Connect the next edge to the start of the removed edge
  const hoveredLine = hoveredElement.element as Line;
  const nextLine = hoveredElement.polygon.lines.find(
    (line) => line.points[0] === hoveredLine.points[1]
  );
  nextLine?.setStart(hoveredLine.points[0]);

  // Remove the hovered edge
  hoveredElement.polygon.lines = hoveredElement.polygon.lines.filter(
    (line) => line !== hoveredLine
  );
}

export function removePoint(hoveredElement: HoveredElement<Point>) {
  // Find the two adjacent edges
  const hoveredPoint = hoveredElement.element as Point;
  const nextLine = hoveredElement.polygon.lines.find(
    (line) => line.points[0] === hoveredPoint
  );
  const prevLine = hoveredElement.polygon.lines.find(
    (line) => line.points[1] === hoveredPoint
  );

  // Move the start of the next edge
  nextLine!.points[0] = prevLine!.points[0];

  // Remove the previous edge
  hoveredElement.polygon.lines = hoveredElement.polygon.lines.filter(
    (line) => line !== prevLine
  );
}

export function middleOfLine(line: Line): Point {
  const newX = (line.points[0].x + line.points[1].x) / 2;
  const newY = (line.points[0].y + line.points[1].y) / 2;
  return new Point(newX, newY);
}

export function findHoveredElement(
  polygons: Polygon[],
  mousePoint: Point,
  edgeOnly: boolean = false
): HoveredElement<Point> | HoveredElement<Line> | undefined {
  const resultLines = findHoveredLines(polygons, mousePoint);
  const resultPoints = findHoveredPoints(polygons, mousePoint);

  let hoveredElement: HoveredElement<Point> | HoveredElement<Line> | undefined;
  if (!edgeOnly && resultPoints.length > 0) hoveredElement = resultPoints[0];
  else if (resultLines.length > 0) hoveredElement = resultLines[0];
  return hoveredElement;
}
