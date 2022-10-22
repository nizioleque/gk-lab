import { useEffect, useRef, MouseEvent, useContext } from 'react';
import { AppContext } from '../AppContext';
import Point from '../class/Point';
import useError from '../hooks/useError';
import useHandlers from '../hooks/useHandlers';
import useShiftPressed from '../hooks/useShiftPressed';
import { DrawState } from '../types';

interface CanvasProps {
  size: { width: number; height: number };
}

function Canvas({ size }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    editorMode,
    polygons,
    addPolygon,
    removePolygon,
    hoveredRestriction,
  } = useContext(AppContext);
  const ctx = () => canvasRef.current?.getContext('2d')!;
  const getMousePosition = (event: MouseEvent): Point => {
    const rect = canvasRef.current?.getBoundingClientRect()!;
    return new Point(event.clientX - rect.left, event.clientY - rect.top);
  };

  const drawState: DrawState = {};
  useShiftPressed(drawState);

  useEffect(() => draw(), [size, polygons, hoveredRestriction]);

  const { showError, errorText, setErrorText } = useError();

  const draw = () => _draw(ctx());
  const _draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, size.width, size.height);
    for (const polygon of polygons) polygon.draw(ctx);
    drawState.currentPolygon?.draw(ctx);
    drawState.drawingLine?.draw(ctx);
  };

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useHandlers({
    editorMode,
    drawState,
    polygons,
    addPolygon,
    removePolygon,
    setErrorText,
    draw,
    getMousePosition,
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        className='canvas'
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        width={size.width}
        height={size.height}
      />
      <div className={`alert ${showError ? 'show' : ''}`}>
        <div className='alert-icon'>⚠️</div>
        <div>{errorText}</div>
      </div>
    </>
  );
}

export default Canvas;
