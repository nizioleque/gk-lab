import Line from './class/Line';
import Point from './class/Point';
import Polygon from './class/Polygon';
import {
  LengthRestriction,
  PerpendicularRestriction,
  RestrictionData,
} from './class/Restriction';

export interface SceneGenerator {
  name: string;
  data: () => { polygons: Polygon[]; restrictionData: RestrictionData };
}

const scene1Data = () => {
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
  const point10 = new Point(200, 290);

  const line6 = new Line(point6, point7);
  const line7 = new Line(point7, point8);
  const line8 = new Line(point8, point9);
  const line9 = new Line(point9, point10);
  const line10 = new Line(point10, point6);

  const polygon2 = new Polygon([line6, line7, line8, line9, line10]);

  const polygons = [polygon1, polygon2];

  const restrictionData = new RestrictionData();
  restrictionData.add(
    new LengthRestriction(
      {
        polygon: polygon1,
        element: line2,
      },
      200
    )
  );
  restrictionData.add(
    new LengthRestriction(
      {
        polygon: polygon2,
        element: line8,
      },
      200
    )
  );
  restrictionData.add(
    new PerpendicularRestriction(
      {
        polygon: polygon1,
        element: line2,
      },
      {
        polygon: polygon2,
        element: line7,
      }
    )
  );

  return { polygons, restrictionData };
};

const scene1: SceneGenerator = {
  name: 'Gwiazda i pięciokąt',
  data: scene1Data,
};

const scene2Data = () => {
  return { polygons: [], restrictionData: new RestrictionData() };
};

const scene2: SceneGenerator = {
  name: 'Pusta',
  data: scene2Data,
};

const scenes: SceneGenerator[] = [scene2, scene1];

export default scenes;
