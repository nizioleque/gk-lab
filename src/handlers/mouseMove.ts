import Point from '../class/Point';
import { DrawState, EditorMode } from '../types';
import { canClosePolygon } from '../utils';

export default function mouseMove(
  editorMode: EditorMode,
  mousePoint: Point,
  drawState: DrawState
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
    drawState.drawingLine!.points[1] = mousePoint;
    if (canClosePolygon(drawState))
      drawState.polygonStart?.isAt(mousePoint, true);
    return true;
  }

  function moveMode() {
    return false;
  }

  function deleteMode() {
    return false;
  }
}
