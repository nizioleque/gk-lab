import Point from '../class/Point';
import mouseDown from '../handlers/mouseDown';
import mouseMove from '../handlers/mouseMove';
import mouseUp from '../handlers/mouseUp';
import { DrawState } from '../types';
import { MouseEvent, useContext } from 'react';
import { AppContext } from '../AppContext';

interface HandlersProps {
  drawState: DrawState;
  draw: () => void;
  getMousePosition: (event: MouseEvent) => Point;
}

export default function useHandlers({
  drawState,
  draw,
  getMousePosition,
}: HandlersProps) {
  const {
    editorMode,
    addPolygon,
    removePolygon,
    restrictionData,
    lengthRestrictionLine,
    setLengthRestrictionLine,
    forceRerender,
    polygons,
    setErrorText,
  } = useContext(AppContext);

  const handleMouseMove = (event: MouseEvent) => {
    const mousePoint = getMousePosition(event);
    mouseMove(
      editorMode,
      mousePoint,
      drawState,
      polygons,
      restrictionData,
      setErrorText,
      lengthRestrictionLine
    );
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
      setErrorText,
      setLengthRestrictionLine,
      restrictionData,
      forceRerender
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
