import Line from './class/Line';
import Point from './class/Point';
import Polygon from './class/Polygon';
import RestrictionData from './class/Restriction';

export interface SceneGenerator {
  name: string;
  polygons: () => Polygon[];
  restrictionData: () => RestrictionData;
}

const polygons1 = () => {
  const point1 = new Point(525, 200);
  const point2 = new Point(360, 390);
  const point3 = new Point(490, 685);
  const point4 = new Point(845, 682);
  const point5 = new Point(944, 383);

  const line1 = new Line(point1, point2);
  const line2 = new Line(point2, point3);
  const line3 = new Line(point3, point4);
  const line4 = new Line(point4, point5);
  const line5 = new Line(point5, point1);

  const polygon1 = new Polygon([line1, line2, line3, line4, line5]);

  const point6 = new Point(170, 80);
  const point7 = new Point(80, 290);
  const point8 = new Point(245, 160);
  const point9 = new Point(55, 165);
  const point10 = new Point(170, 80);

  const line6 = new Line(point6, point7);
  const line7 = new Line(point7, point8);
  const line8 = new Line(point8, point9);
  const line9 = new Line(point9, point10);
  const line10 = new Line(point10, point6);

  const polygon2 = new Polygon([line6, line7, line8, line9, line10]);

  return [polygon1, polygon2];
};

const restrictionData1 = () => new RestrictionData();

const scene1: SceneGenerator = {
  name: 'Gwiazda i pięciokąt',
  polygons: polygons1,
  restrictionData: restrictionData1,
};

const scenes: SceneGenerator[] = [scene1];

export default scenes;
