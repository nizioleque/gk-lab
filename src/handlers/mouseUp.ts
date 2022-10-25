import Point from '../class/Point';
import { DrawState, EditorMode } from '../types';

export default function mouseUp(
  editorMode: EditorMode,
  mousePoint: Point,
  drawState: DrawState
) {
  switch (editorMode) {
    case EditorMode.Draw:
      addMode();
      break;
    case EditorMode.Move:
      moveMode();
      break;
    case EditorMode.Delete:
      deleteMode();
      break;
    case EditorMode.Split:
      splitMode();
      break;
    case EditorMode.SetLength:
      setLengthMode();
      break;
    case EditorMode.SetPerpendicular:
      setPerpendicularMode();
      break;
  }

  function addMode() {}

  function moveMode() {
    drawState.draggedPoint = undefined;
    drawState.draggedLine = undefined;
    drawState.dragStart = undefined;
    drawState.isDraggingPolygon = undefined;
    drawState.draggedBezierPoint = undefined;
  }

  function deleteMode() {}

  function splitMode() {}

  function setLengthMode() {}

  function setPerpendicularMode() {}
}
