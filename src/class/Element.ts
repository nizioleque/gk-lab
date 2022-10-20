import Point from './Point';

export default interface Element {
  hover: boolean;
  draw: (ctx: CanvasRenderingContext2D) => void;
  isAt: (mousePoint: Point, highlight: boolean) => boolean;
}
