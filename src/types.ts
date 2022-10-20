import Line from './class/Line';
import Point from './class/Point';
import Polygon from './class/Polygon';

export interface DrawState {
  currentPolygon: Polygon | undefined;
  drawingLine: Line | undefined;
  drawingStart: Point | undefined;
  polygonStart: Point | undefined;
}

export enum EditorMode {
  Add,
  Move,
  Delete,
}
