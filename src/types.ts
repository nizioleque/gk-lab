import Element from './class/Element';
import Line from './class/Line';
import Point from './class/Point';
import Polygon from './class/Polygon';

export interface DrawState {
  currentPolygon?: Polygon;
  drawingLine?: Line;
  drawingStart?: Point;
  polygonStart?: Point;
  draggedPoint?: HoveredElement<Point>;
  draggedLine?: HoveredElement<Line>;
  lineDragStart?: Point;
}

export enum EditorMode {
  Add,
  Move,
  Delete,
}

export interface HoveredElement<T> {
  polygon: Polygon;
  element: T;
}
