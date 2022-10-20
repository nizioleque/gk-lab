import Line from '../class/Line';
import Point from '../class/Point';
import Polygon from '../class/Polygon';
import { DrawState, EditorMode, HoveredElement } from '../types';
import { canClosePolygon, findHoveredLines, findHoveredPoints } from '../utils';

export default function mouseDown(
  editorMode: EditorMode,
  mousePoint: Point,
  drawState: DrawState,
  polygons: Polygon[],
  addPolygon: (polygon: Polygon) => void
): boolean {
  switch (editorMode) {
    case EditorMode.Add:
      return addMode();
    case EditorMode.Move:
      return moveMode();
    case EditorMode.Delete:
      return deleteMode();
  }

  function addMode() {
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
      if (
        canClosePolygon(drawState) &&
        drawState.polygonStart?.isAt(mousePoint)
      ) {
        // Finish current polygon
        drawState.drawingLine!.setEnd(drawState.polygonStart);
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
        drawState.drawingLine!.setEnd(mousePoint);
        drawState.currentPolygon.lines.push(drawState.drawingLine!);
        drawState.drawingStart = mousePoint;
        drawState.drawingLine = new Line(
          drawState.drawingStart,
          drawState.drawingStart
        );
      }
    }
    return true;
  }

  function moveMode() {
    const resultLines = findHoveredLines(polygons, mousePoint);
    const resultPoints = findHoveredPoints(polygons, mousePoint);

    let hoveredElement:
      | HoveredElement<Line>
      | HoveredElement<Point>
      | undefined;
    if (resultPoints.length > 0) drawState.draggedPoint = resultPoints[0];
    else if (resultLines.length > 0) {
      drawState.draggedLine = resultLines[0];
      drawState.lineDragStart = mousePoint;
    }
    if (!hoveredElement) return true;

    return true;
  }

  function deleteMode() {
    return false;
  }
}
