import { Dispatch, SetStateAction, useState } from 'react';
import Polygon from '../class/Polygon';

export default function usePolygons(): {
  polygons: Polygon[];
  addPolygon: (polygon: Polygon) => void;
  removePolygon: (polygon: Polygon) => void;
  setPolygons: Dispatch<SetStateAction<Polygon[]>>;
} {
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const addPolygon = (polygon: Polygon) => setPolygons([...polygons, polygon]);
  const removePolygon = (polygon: Polygon) =>
    setPolygons(polygons.filter((x) => x !== polygon));
  return { polygons, addPolygon, removePolygon, setPolygons };
}
