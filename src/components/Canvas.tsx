import { useEffect, MouseEvent, useContext } from 'react';
import { AppContext } from '../AppContext';
import Point from '../class/Point';
import useHandlers from '../hooks/useHandlers';
import useShiftPressed from '../hooks/useShiftPressed';
import { DrawState } from '../types';

function Canvas() {
  const {
    polygons,
    hoveredRestriction,
    canvasRef,
    canvasSize: size,
  } = useContext(AppContext);
  const ctx = () => canvasRef.current?.getContext('2d')!;
  const getMousePosition = (event: MouseEvent): Point => {
    const rect = canvasRef.current?.getBoundingClientRect()!;
    return new Point(
      (event.clientX - rect.left) * size.pixelRatio,
      (event.clientY - rect.top) * size.pixelRatio
    );
  };

  const drawState: DrawState = {};
  useShiftPressed(drawState);

  const draw = () => _draw(ctx());
  const _draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(
      0,
      0,
      size.width * size.pixelRatio,
      size.height * size.pixelRatio
    );
    for (const polygon of polygons) polygon.draw(ctx);
    drawState.currentPolygon?.draw(ctx);
    drawState.drawingLine?.draw(ctx);
  };

  useEffect(() => draw(), [size, polygons, hoveredRestriction]);
  if (ctx()) draw();

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useHandlers({
    drawState,
    draw,
    getMousePosition,
  });

  return (
    <canvas
      ref={canvasRef}
      className='canvas'
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      width={size.width * size.pixelRatio}
      height={size.height * size.pixelRatio}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    />
  );
}

export default Canvas;
