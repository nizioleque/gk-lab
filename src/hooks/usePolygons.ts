import { useState } from 'react';
import Polygon from '../class/Polygon';

export default function usePolygons(): {
  polygons: Polygon[];
  addPolygon: (polygon: Polygon) => void;
  removePolygon: (polygon: Polygon) => void;
} {
  const [polygons, _setPolygons] = useState<Polygon[]>([]);
  const addPolygon = (polygon: Polygon) => _setPolygons([...polygons, polygon]);
  const removePolygon = (polygon: Polygon) =>
    _setPolygons(polygons.filter((x) => x !== polygon));
  return { polygons, addPolygon, removePolygon };
}
