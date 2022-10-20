import { useEffect, useRef, useState, MouseEvent } from 'react';
import Point from './class/Point';
import Polygon from './class/Polygon';
import mouseDown from './handlers/mouseDown';
import mouseMove from './handlers/mouseMove';
import mouseUp from './handlers/mouseUp';
import { DrawState } from './types';

interface CanvasProps {
  size: { width: number; height: number };
}

function Canvas({ size }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = () => canvasRef.current?.getContext('2d')!;
  const getMousePosition = (event: MouseEvent): Point => {
    const rect = canvasRef.current?.getBoundingClientRect()!;
    return new Point(event.clientX - rect.left, event.clientY - rect.top);
  };

  console.log('canvas rendered');

  const drawState: DrawState = {
    currentPolygon: undefined,
    drawingLine: undefined,
    drawingStart: undefined,
    polygonStart: undefined,
  };

  const [polygons, _setPolygons] = useState<Polygon[]>([]);
  const addPolygon = (polygon: Polygon) => _setPolygons([...polygons, polygon]);

  useEffect(() => draw(), [size]);

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
    mouseMove(mousePoint, drawState);
    draw();
  };

  const handleMouseDown = (event: MouseEvent) => {
    const mousePoint = getMousePosition(event);
    mouseDown(mousePoint, drawState, addPolygon);
    draw();
  };

  const handleMouseUp = (event: MouseEvent) => {
    const mousePoint = getMousePosition(event);
    mouseUp(mousePoint, drawState);
    draw();
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
