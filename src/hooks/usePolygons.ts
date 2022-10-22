import { Dispatch, SetStateAction, useState } from 'react';
import Polygon from '../class/Polygon';
import RestrictionData from '../class/RestrictionData';

export default function usePolygons(restrictionData: RestrictionData): {
  polygons: Polygon[];
  addPolygon: (polygon: Polygon) => void;
  removePolygon: (polygon: Polygon) => void;
  setPolygons: Dispatch<SetStateAction<Polygon[]>>;
} {
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const addPolygon = (polygon: Polygon) => setPolygons([...polygons, polygon]);
  const removePolygon = (polygon: Polygon) => {
    for (const line of polygon.lines) {
      for (const restriction of line.restrictions) {
        restrictionData.delete(restriction);
      }
    }
    setPolygons(polygons.filter((x) => x !== polygon));
  };
  return { polygons, addPolygon, removePolygon, setPolygons };
}
