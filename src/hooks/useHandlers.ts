import Point from '../class/Point';
import Polygon from '../class/Polygon';
import mouseDown from '../handlers/mouseDown';
import mouseMove from '../handlers/mouseMove';
import mouseUp from '../handlers/mouseUp';
import { DrawState } from '../types';
import { MouseEvent, useContext } from 'react';
import { AppContext } from '../AppContext';

interface HandlersProps {
  drawState: DrawState;
  polygons: Polygon[];
  setErrorText: (text: string) => void;
  draw: () => void;
  getMousePosition: (event: MouseEvent) => Point;
}

export default function useHandlers({
  drawState,
  polygons,
  setErrorText,
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
