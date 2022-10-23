import { useRef, useState } from 'react';
import Line from '../class/Line';
import { LengthRestriction } from '../class/Restriction';
import RestrictionData from '../class/RestrictionData';
import { PolygonWith } from '../types';

export default function useAddLengthRestriction(
  restrictionData: RestrictionData
) {
  const lengthInputRef = useRef<HTMLInputElement>(null);
  const [lengthRestrictionLine, setLengthRestrictionLine] = useState<
    PolygonWith<Line> | undefined
  >(undefined);
  const addLengthRestriction = () => {
    if (!lengthInputRef.current) return;
    if (!lengthRestrictionLine) return;
    const value = parseFloat(lengthInputRef.current.value);
    // TODO: handle error
    restrictionData.add(new LengthRestriction(lengthRestrictionLine, value));
    setLengthRestrictionLine(undefined);
  };

  return {
    lengthInputRef,
    lengthRestrictionLine,
    setLengthRestrictionLine,
    addLengthRestriction,
  };
}
