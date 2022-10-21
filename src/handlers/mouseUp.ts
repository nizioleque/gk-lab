import Line from '../class/Line';
import Point from '../class/Point';
import { DrawState, EditorMode, HoveredElement } from '../types';
import { findHoveredLines, findHoveredPoints } from '../utils';

export default function mouseUp(
  editorMode: EditorMode,
  mousePoint: Point,
  drawState: DrawState
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
    return false;
  }

  function moveMode() {
    drawState.draggedPoint = undefined;
    drawState.draggedLine = undefined;
    drawState.dragStart = undefined;
    drawState.isDraggingPolygon = undefined;
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
