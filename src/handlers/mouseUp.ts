import Point from '../class/Point';
import { DrawState, EditorMode } from '../types';

export default function mouseUp(
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
    return false;
  }

  function moveMode() {
    return false;
  }

  function deleteMode() {
    return false;
  }
}
