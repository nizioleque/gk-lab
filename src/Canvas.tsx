import { useEffect, useRef, useState, MouseEvent, useCallback } from 'react';
import Line from './class/Line';
import Point from './class/Point';
import Polygon from './class/Polygon';
import { findHoveredElements } from './utils';

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

  let currentPolygon: Polygon | undefined;
  let drawingLine: Line | undefined;
  let drawingStart: Point | undefined;
  let polygonStart: Point | undefined;

  const [polygons, setPolygons] = useState<Polygon[]>([]);

  // Effects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    draw();
  }, []);

  useEffect(() => {
    draw();
  }, [size]);

  // Draw
  const draw = () => {
    _draw(ctx());
  };

  function _draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, size.width, size.height);

    for (const polygon of polygons) polygon.draw(ctx);
    currentPolygon?.draw(ctx);
    drawingLine?.draw(ctx);
  }

  // Event handlers
  const handleMouseMove = (event: MouseEvent) => {
    const mousePoint = getMousePosition(event);
    if (!drawingStart) return;
    drawingLine!.points[1] = mousePoint;
    polygonStart?.isAt(mousePoint, true);
    // findHoveredElements(polygons, mousePoint);
    draw();
  };

  const handleMouseDown = (event: MouseEvent) => {
    const mousePoint = getMousePosition(event);
    if (!drawingStart) {
      // Start new polygon
      polygonStart = mousePoint;
      drawingStart = mousePoint;
      drawingLine = new Line(drawingStart, drawingStart);
    } else {
      // Polygon is being drawn

      if (polygonStart?.isAt(mousePoint)) {
        // Finish current polygon
        drawingLine!.points[1] = polygonStart;
        currentPolygon!.lines.push(drawingLine!);
        setPolygons([...polygons, currentPolygon!]);

        // Reset state
        currentPolygon = undefined;
        polygonStart = undefined;
        drawingLine = undefined;
        drawingStart = undefined;
      } else {
        // Continue current polygon
        if (!currentPolygon) {
          currentPolygon = new Polygon([]);
        }
        drawingLine!.points[1] = mousePoint;
        currentPolygon.lines.push(drawingLine!);
        drawingStart = mousePoint;
        drawingLine = new Line(drawingStart, drawingStart);
      }
    }
    console.log(currentPolygon);
    draw();
  };

  const handleMouseUp = () => {
    // currentStart = undefined;
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
