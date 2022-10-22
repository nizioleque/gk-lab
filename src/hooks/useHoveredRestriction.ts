import { useState } from 'react';
import { Restriction } from '../class/Restriction';

export default function useHoveredRestriction(): {
  hoveredRestriction: Restriction | undefined;
  setHoveredRestriction: (restriction: Restriction | undefined) => void;
} {
  const [hoveredRestriction, _setHoveredRestriction] = useState<
    Restriction | undefined
  >();
  const setHoveredRestriction = (restriction: Restriction | undefined) => {
    if (restriction) {
      restriction?.members.forEach((member) => {
        if (member) member.element.hover = true;
      });
    } else {
      hoveredRestriction?.members.forEach((member) => {
        if (member) member.element.hover = false;
      });
    }
    _setHoveredRestriction(restriction);
  };

  return { hoveredRestriction, setHoveredRestriction };
}
