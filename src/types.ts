import Line from './class/Line';
import Point from './class/Point';
import Polygon from './class/Polygon';

export interface DrawState {
  currentPolygon?: Polygon;
  drawingLine?: Line;
  drawingStart?: Point;
  polygonStart?: Point;

  draggedPoint?: PolygonWith<Point>;
  draggedLine?: PolygonWith<Line>;
  dragStart?: Point;

  isShiftPressed?: boolean;
  isDraggingPolygon?: boolean;

  restrictionFirstLine?: PolygonWith<Line>;
}

export enum EditorMode {
  Draw,
  Move,
  Delete,
  Split,
  SetLength,
  SetPerpendicular,
}

export interface PolygonWith<T> {
  polygon: Polygon;
  element: T;
}
