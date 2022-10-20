import Line from '../class/Line';
import Point from '../class/Point';
import Polygon from '../class/Polygon';
import { DrawState } from '../types';

export default function mouseDown(
  mousePoint: Point,
  drawState: DrawState,
  addPolygon: (polygon: Polygon) => void
) {
  if (!drawState.drawingStart) {
    // Start new polygon
    drawState.polygonStart = mousePoint;
    drawState.drawingStart = mousePoint;
    drawState.drawingLine = new Line(
      drawState.drawingStart,
      drawState.drawingStart
    );
  } else {
    // Polygon is being drawn

    if (drawState.polygonStart?.isAt(mousePoint)) {
      // Finish current polygon
      drawState.drawingLine!.points[1] = drawState.polygonStart;
      drawState.currentPolygon!.lines.push(drawState.drawingLine!);
      addPolygon(drawState.currentPolygon!);

      // Reset state
      drawState.currentPolygon = undefined;
      drawState.polygonStart = undefined;
      drawState.drawingLine = undefined;
      drawState.drawingStart = undefined;
    } else {
      // Continue current polygon
      if (!drawState.currentPolygon) {
        drawState.currentPolygon = new Polygon([]);
      }
      drawState.drawingLine!.points[1] = mousePoint;
      drawState.currentPolygon.lines.push(drawState.drawingLine!);
      drawState.drawingStart = mousePoint;
      drawState.drawingLine = new Line(
        drawState.drawingStart,
        drawState.drawingStart
      );
    }
  }
  console.log(drawState.currentPolygon);
}
