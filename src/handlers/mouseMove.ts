import Line from '../class/Line';
import Point from '../class/Point';
import Polygon from '../class/Polygon';
import { DrawState, EditorMode } from '../types';
import { canClosePolygon, findHoveredElement } from '../utils';

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
      return highlight();
    }

    return true;
  }

  function deleteMode() {
    return highlight();
  }

  function splitMode() {
    return highlight(true);
  }

  function setLengthMode() {
    return false;
  }

  function setPerpendicularMode() {
    return false;
  }

  function highlight(edgeOnly: boolean = false): boolean {
    const hoveredElement = findHoveredElement(polygons, mousePoint);
    if (!hoveredElement) return true;

    if (edgeOnly) {
      if (hoveredElement.element instanceof Line) {
        hoveredElement.element.hover = true;
        return true;
      }
      return false;
    }

    if (drawState.isShiftPressed) {
      hoveredElement.polygon.highlightAll();
    } else {
      hoveredElement.element.hover = true;
    }
    return true;
  }
}
