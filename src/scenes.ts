import Line from './class/Line';
import Point from './class/Point';
import Polygon from './class/Polygon';
import {
  LengthRestriction,
  PerpendicularRestriction,
} from './class/Restriction';
import RestrictionData from './class/RestrictionData';

export interface SceneGenerator {
  name: string;
  data: () => { polygons: Polygon[]; restrictionData: RestrictionData };
}

const scene1Data = () => {
  const point1 = new Point(611, 459);
  const point2 = new Point(497, 581);
  const point3 = new Point(615, 742);
  const point4 = new Point(743, 707);
  const point5 = new Point(804, 524);

  const line1 = new Line(point1, point2);
  const line2 = new Line(point2, point3);
  const line3 = new Line(point3, point4);
  const line4 = new Line(point4, point5);
  const line5 = new Line(point5, point1);

  const polygon1 = new Polygon([line1, line2, line3, line4, line5]);

  const point6 = new Point(342, 275);
  const point7 = new Point(268, 483);
  const point8 = new Point(440, 356);
  const point9 = new Point(240, 354);
  const point10 = new Point(394, 484);

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
  name: 'Gwiazda i pięciokąt (3 ograniczenia)',
  data: scene1Data,
};

const scene2Data = () => {
  return { polygons: [], restrictionData: new RestrictionData() };
};

const scene2: SceneGenerator = {
  name: 'Pusta',
  data: scene2Data,
};

const scene3Data = () => {
  const point1 = new Point(89, 165);
  const point2 = new Point(251, 168);
  const point3 = new Point(246, 482);
  const point4 = new Point(556, 490);
  const point5 = new Point(486, 440);
  const point6 = new Point(487, 356);
  const point7 = new Point(306, 351);
  const point8 = new Point(308, 86);
  const point9 = new Point(145, 86);

  const line1 = new Line(point1, point2);
  const line2 = new Line(point2, point3);
  const line3 = new Line(point3, point4);
  const line4 = new Line(point4, point5);
  const line5 = new Line(point5, point6);
  const line6 = new Line(point6, point7);
  const line7 = new Line(point7, point8);
  const line8 = new Line(point8, point9);
  const line9 = new Line(point9, point1);

  const polygon1 = new Polygon([
    line1,
    line2,
    line3,
    line4,
    line5,
    line6,
    line7,
    line8,
    line9,
  ]);

  const restrictionData = new RestrictionData();
  restrictionData.add(
    new LengthRestriction({ polygon: polygon1, element: line2 }, 314)
  );
  restrictionData.add(
    new LengthRestriction({ polygon: polygon1, element: line6 }, 181)
  );
  restrictionData.add(
    new PerpendicularRestriction(
      { polygon: polygon1, element: line1 },
      { polygon: polygon1, element: line2 }
    )
  );
  restrictionData.add(
    new PerpendicularRestriction(
      { polygon: polygon1, element: line2 },
      { polygon: polygon1, element: line3 }
    )
  );
  restrictionData.add(
    new PerpendicularRestriction(
      { polygon: polygon1, element: line5 },
      { polygon: polygon1, element: line6 }
    )
  );
  restrictionData.add(
    new PerpendicularRestriction(
      { polygon: polygon1, element: line7 },
      { polygon: polygon1, element: line8 }
    )
  );
  restrictionData.add(
    new PerpendicularRestriction(
      { polygon: polygon1, element: line9 },
      { polygon: polygon1, element: line4 }
    )
  );

  return { polygons: [polygon1], restrictionData };
};

const scene3: SceneGenerator = {
  name: '9-kąt – wiele prostopadłości',
  data: scene3Data,
};

const scene4Data = () => {
  const point1 = new Point(500, 300);
  const point2 = new Point(501, 500);
  const point3 = new Point(701, 500);
  const point4 = new Point(700, 300);

  const line1 = new Line(point1, point2);
  const line2 = new Line(point2, point3);
  const line3 = new Line(point3, point4);
  const line4 = new Line(point4, point1);

  const polygon1 = new Polygon([line1, line2, line3, line4]);

  const restrictionData = new RestrictionData();
  restrictionData.add(
    new LengthRestriction({ polygon: polygon1, element: line1 }, 200)
  );
  restrictionData.add(
    new LengthRestriction({ polygon: polygon1, element: line2 }, 200)
  );
  restrictionData.add(
    new LengthRestriction({ polygon: polygon1, element: line3 }, 200)
  );
  restrictionData.add(
    new LengthRestriction({ polygon: polygon1, element: line4 }, 200)
  );
  restrictionData.add(
    new PerpendicularRestriction(
      { polygon: polygon1, element: line1 },
      { polygon: polygon1, element: line2 }
    )
  );
  restrictionData.add(
    new PerpendicularRestriction(
      { polygon: polygon1, element: line2 },
      { polygon: polygon1, element: line3 }
    )
  );
  restrictionData.add(
    new PerpendicularRestriction(
      { polygon: polygon1, element: line3 },
      { polygon: polygon1, element: line4 }
    )
  );
  restrictionData.add(
    new PerpendicularRestriction(
      { polygon: polygon1, element: line4 },
      { polygon: polygon1, element: line1 }
    )
  );

  return { polygons: [polygon1], restrictionData };
};

const scene4: SceneGenerator = {
  name: 'Kwadrat ze wszystkimi ograniczeniami',
  data: scene4Data,
};

const scene5Data = () => {
  const restrictionData = new RestrictionData();

  const point11 = new Point(385, 234);
  const point12 = new Point(384, 358);
  const point13 = new Point(529, 359);

  const line11 = new Line(point11, point12);
  const line12 = new Line(point12, point13);
  const line13 = new Line(point13, point11);

  const polygon1 = new Polygon([line11, line12, line13]);

  const point21 = new Point(664, 216);
  const point22 = new Point(807, 370);
  const point23 = new Point(805, 217);

  const line21 = new Line(point21, point22);
  const line22 = new Line(point22, point23);
  const line23 = new Line(point23, point21);

  const polygon2 = new Polygon([line21, line22, line23]);

  const point31 = new Point(805, 512);
  const point32 = new Point(803, 655);
  const point33 = new Point(677, 657);

  const line31 = new Line(point31, point32);
  const line32 = new Line(point32, point33);
  const line33 = new Line(point33, point31);

  const polygon3 = new Polygon([line31, line32, line33]);

  const point41 = new Point(452, 652);
  const point42 = new Point(528, 523);
  const point43 = new Point(378, 521);

  const line41 = new Line(point41, point42);
  const line42 = new Line(point42, point43);
  const line43 = new Line(point43, point41);

  const polygon4 = new Polygon([line41, line42, line43]);

  restrictionData.add(
    new LengthRestriction({ polygon: polygon4, element: line41 }, 150)
  );
  restrictionData.add(
    new LengthRestriction({ polygon: polygon4, element: line42 }, 150)
  );
  restrictionData.add(
    new LengthRestriction({ polygon: polygon4, element: line43 }, 150)
  );

  restrictionData.add(
    new PerpendicularRestriction(
      { polygon: polygon1, element: line11 },
      { polygon: polygon2, element: line23 }
    )
  );
  restrictionData.add(
    new PerpendicularRestriction(
      { polygon: polygon2, element: line23 },
      { polygon: polygon3, element: line31 }
    )
  );
  restrictionData.add(
    new PerpendicularRestriction(
      { polygon: polygon3, element: line31 },
      { polygon: polygon4, element: line42 }
    )
  );

  return {
    polygons: [polygon1, polygon2, polygon3, polygon4],
    restrictionData,
  };
};

const scene5: SceneGenerator = {
  name: 'Tańczące trójkąty',
  data: scene5Data,
};

const scenes: SceneGenerator[] = [scene2, scene1, scene3, scene4, scene5];

export default scenes;
