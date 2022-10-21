import { useEffect, useRef, useState, MouseEvent, useContext } from 'react';
import { AppContext } from '../AppContext';
import Point from '../class/Point';
import Polygon from '../class/Polygon';
import mouseDown from '../handlers/mouseDown';
import mouseMove from '../handlers/mouseMove';
import mouseUp from '../handlers/mouseUp';
import { DrawState } from '../types';

interface CanvasProps {
  size: { width: number; height: number };
}

function Canvas({ size }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { editorMode } = useContext(AppContext);
  const ctx = () => canvasRef.current?.getContext('2d')!;
  const getMousePosition = (event: MouseEvent): Point => {
    const rect = canvasRef.current?.getBoundingClientRect()!;
    return new Point(event.clientX - rect.left, event.clientY - rect.top);
  };

  const drawState: DrawState = {};

  useEffect(() => {
    function setShiftPressed(event: KeyboardEvent) {
      if (event.shiftKey) drawState.isShiftPressed = true;
    }
    function resetShiftPressed() {
      drawState.isShiftPressed = false;
    }
    document.addEventListener('keydown', setShiftPressed);
    document.addEventListener('keyup', resetShiftPressed);
    return () => {
      document.removeEventListener('keydown', setShiftPressed);
      document.removeEventListener('keyup', resetShiftPressed);
    };
  }, [drawState]);

  const [polygons, _setPolygons] = useState<Polygon[]>([]);
  const addPolygon = (polygon: Polygon) => _setPolygons([...polygons, polygon]);

  useEffect(() => draw(), [size, polygons]);

  // Draw
  const draw = () => _draw(ctx());
  const _draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, size.width, size.height);
    for (const polygon of polygons) polygon.draw(ctx);
    drawState.currentPolygon?.draw(ctx);
    drawState.drawingLine?.draw(ctx);
  };

  // Event handlers
  const handleMouseMove = (event: MouseEvent) => {
    const mousePoint = getMousePosition(event);
    const redraw = mouseMove(editorMode, mousePoint, drawState, polygons);
    if (redraw) draw();
  };

  const handleMouseDown = (event: MouseEvent) => {
    const mousePoint = getMousePosition(event);
    const redraw = mouseDown(
      editorMode,
      mousePoint,
      drawState,
      polygons,
      addPolygon
    );
    if (redraw) draw();
  };

  const handleMouseUp = (event: MouseEvent) => {
    const mousePoint = getMousePosition(event);
    const redraw = mouseUp(editorMode, mousePoint, drawState);
    if (redraw) draw();
  };

  return (
    <canvas
      ref={canvasRef}
      className='canvas'
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      width={size.width}
      height={size.height}
    />
  );
}

export default Canvas;
