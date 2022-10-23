import { useRef, useState } from 'react';
import Line from '../class/Line';
import Polygon from '../class/Polygon';
import { LengthRestriction } from '../class/Restriction';
import RestrictionData from '../class/RestrictionData';
import { PolygonWith } from '../types';

export default function useAddLengthRestriction(
  restrictionData: RestrictionData,
  setErrorText: (text: string) => void,
  polygons: Polygon[]
) {
  const lengthInputRef = useRef<HTMLInputElement>(null);
  const [lengthRestrictionLine, setLengthRestrictionLine] = useState<
    PolygonWith<Line> | undefined
  >(undefined);
  const addLengthRestriction = () => {
    if (!lengthInputRef.current) return;
    if (!lengthRestrictionLine) return;
    const value = parseFloat(lengthInputRef.current.value);
    const error = restrictionData.add(
      new LengthRestriction(lengthRestrictionLine, value)
    );
    if (error) setErrorText('Ta linia posiada już ograniczenie długości!');
    else Polygon.applyRestrictions(polygons, restrictionData, []);
    setLengthRestrictionLine(undefined);
  };

  return {
    lengthInputRef,
    lengthRestrictionLine,
    setLengthRestrictionLine,
    addLengthRestriction,
  };
}
