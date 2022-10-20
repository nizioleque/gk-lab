import Line from '../class/Line';
import Point from '../class/Point';
import Polygon from '../class/Polygon';
import { DrawState, EditorMode, HoveredElement } from '../types';
import { canClosePolygon, findHoveredLines, findHoveredPoints } from '../utils';

export default function mouseMove(
  editorMode: EditorMode,
  mousePoint: Point,
  drawState: DrawState,
  polygons: Polygon[]
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
    if (!drawState.drawingStart) return false;
    drawState.drawingLine!.setEnd(mousePoint);
    if (canClosePolygon(drawState))
      drawState.polygonStart?.isAt(mousePoint, true);
    return true;
  }

  function moveMode() {
    if (drawState.draggedLine) {
      const offsetX = mousePoint.x - drawState.lineDragStart!.x;
      const offsetY = mousePoint.y - drawState.lineDragStart!.y;
      drawState.draggedLine.element.points[0].x += offsetX;
      drawState.draggedLine.element.points[0].y += offsetY;
      drawState.draggedLine.element.points[1].x += offsetX;
      drawState.draggedLine.element.points[1].y += offsetY;
      drawState.draggedLine.element.hover = true;
      drawState.lineDragStart = mousePoint;
    } else if (drawState.draggedPoint) {
      drawState.draggedPoint.element.x = mousePoint.x;
      drawState.draggedPoint.element.y = mousePoint.y;
      drawState.draggedPoint.element.hover = true;
    } else {
      const resultLines = findHoveredLines(polygons, mousePoint);
      const resultPoints = findHoveredPoints(polygons, mousePoint);

      let hoveredElement:
        | HoveredElement<Point>
        | HoveredElement<Line>
        | undefined;
      if (resultPoints.length > 0) hoveredElement = resultPoints[0];
      else if (resultLines.length > 0) hoveredElement = resultLines[0];
      if (!hoveredElement) return true;

      hoveredElement.element.hover = true;
    }

    return true;
  }

  function deleteMode() {
    return false;
  }
}
