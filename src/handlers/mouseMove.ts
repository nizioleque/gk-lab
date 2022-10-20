import Point from '../class/Point';
import { DrawState } from '../types';

export default function mouseMove(mousePoint: Point, drawState: DrawState) {
  console.log('mouse move', drawState.drawingLine);
  if (!drawState.drawingStart) return;
  drawState.drawingLine!.points[1] = mousePoint;
  drawState.polygonStart?.isAt(mousePoint, true);
  // findHoveredElements(polygons, mousePoint);
}
