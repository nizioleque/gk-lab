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
    case EditorMode.Draw:
      return addMode();
    case EditorMode.Move:
      return moveMode();
    case EditorMode.Delete:
      return deleteMode();
    case EditorMode.Split:
      return splitMode();
    case EditorMode.SetLength:
      return setLengthMode();
    case EditorMode.SetPerpendicular:
      return setPerpendicularMode();
    default:
      return false;
  }

  function addMode() {
    if (!drawState.drawingStart) return false;
    drawState.drawingLine!.setEnd(mousePoint);
    if (canClosePolygon(drawState))
      drawState.polygonStart?.isAt(mousePoint, true);
    return true;
  }

  function moveMode() {
    const draggedElement = drawState.draggedLine || drawState.draggedPoint;
    if (draggedElement && drawState.isShiftPressed) {
      // Drag the entire polygon
      const offsetX = mousePoint.x - drawState.dragStart!.x;
      const offsetY = mousePoint.y - drawState.dragStart!.y;

      for (const line of draggedElement.polygon.lines) {
        line.points[0].x += offsetX;
        line.points[0].y += offsetY;
      }

      drawState.dragStart = mousePoint;
      draggedElement.polygon.highlightAll();

      return true;
    }

    if (drawState.draggedLine) {
      // Drag one edge
      const offsetX = mousePoint.x - drawState.dragStart!.x;
      const offsetY = mousePoint.y - drawState.dragStart!.y;
      drawState.draggedLine.element.points[0].x += offsetX;
      drawState.draggedLine.element.points[0].y += offsetY;
      drawState.draggedLine.element.points[1].x += offsetX;
      drawState.draggedLine.element.points[1].y += offsetY;
      drawState.draggedLine.element.hover = true;
      drawState.dragStart = mousePoint;
    } else if (drawState.draggedPoint) {
      // Drag one point
      drawState.draggedPoint.element.x = mousePoint.x;
      drawState.draggedPoint.element.y = mousePoint.y;
      drawState.draggedPoint.element.hover = true;
    } else {
      // Highlight draggable element
      const resultLines = findHoveredLines(polygons, mousePoint);
      const resultPoints = findHoveredPoints(polygons, mousePoint);

      let hoveredElement:
        | HoveredElement<Point>
        | HoveredElement<Line>
        | undefined;
      if (resultPoints.length > 0) hoveredElement = resultPoints[0];
      else if (resultLines.length > 0) hoveredElement = resultLines[0];
      if (!hoveredElement) return true;

      if (drawState.isShiftPressed) {
        hoveredElement.polygon.highlightAll();
      } else {
      }
      hoveredElement.element.hover = true;
    }

    return true;
  }

  function deleteMode() {
    return false;
  }

  function splitMode() {
    return false;
  }

  function setLengthMode() {
    return false;
  }

  function setPerpendicularMode() {
    return false;
  }
}
