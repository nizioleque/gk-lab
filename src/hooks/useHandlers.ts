import Point from '../class/Point';
import Polygon from '../class/Polygon';
import mouseDown from '../handlers/mouseDown';
import mouseMove from '../handlers/mouseMove';
import mouseUp from '../handlers/mouseUp';
import { DrawState, EditorMode } from '../types';
import { MouseEvent } from 'react';

interface HandlersProps {
  editorMode: EditorMode;
  drawState: DrawState;
  polygons: Polygon[];
  addPolygon: (polygon: Polygon) => void;
  removePolygon: (polygon: Polygon) => void;
  setErrorText: (text: string) => void;
  draw: () => void;
  getMousePosition: (event: MouseEvent) => Point;
}

export default function useHandlers({
  editorMode,
  drawState,
  polygons,
  addPolygon,
  removePolygon,
  setErrorText,
  draw,
  getMousePosition,
}: HandlersProps) {
  const handleMouseMove = (event: MouseEvent) => {
    const mousePoint = getMousePosition(event);
    mouseMove(editorMode, mousePoint, drawState, polygons);
    draw();
  };

  const handleMouseDown = (event: MouseEvent) => {
    const mousePoint = getMousePosition(event);
    mouseDown(
      editorMode,
      mousePoint,
      drawState,
      polygons,
      addPolygon,
      removePolygon,
      setErrorText
    );
    draw();
  };

  const handleMouseUp = (event: MouseEvent) => {
    const mousePoint = getMousePosition(event);
    mouseUp(editorMode, mousePoint, drawState);
    draw();
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp };
}
