import { useEffect, useRef, useState, MouseEvent } from 'react';
import Line from './class/Line';
import Point from './class/Point';

interface CanvasProps {
  size: { width: number; height: number };
}

function Canvas({ size }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = () => canvasRef.current?.getContext('2d')!;
  const getMousePosition = (event: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()!;
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  let currentLine: Line | undefined;
  let currentStart: Point | undefined;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    draw();
  }, []);

  function draw() {
    if (!ctx) return;
    _draw(ctx());
  }

  function _draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, size.width, size.height);

    for (const line of testLines) {
      line.draw(ctx);
    }
    const randomLine = new Line(0, 0, Math.random() * 500, Math.random() * 500);
    randomLine.draw(ctx);
    currentLine?.draw(ctx);
  }

  const handleMouseMove = (event: MouseEvent) => {
    const { x, y } = getMousePosition(event);
    if (!currentStart) return;

    currentLine = new Line(currentStart.x, currentStart.y, x, y);
    draw();
  };

  const handleMouseDown = (event: MouseEvent) => {
    const { x, y } = getMousePosition(event);
    currentStart = new Point(x, y);
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
