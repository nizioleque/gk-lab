import { useEffect } from 'react';
import { DrawState } from '../types';

export default function useShiftPressed(drawState: DrawState) {
  useEffect(() => {
    function setShiftPressed(event: KeyboardEvent) {
      if (event.shiftKey) drawState.isShiftPressed = true;
    }
    function resetShiftPressed() {
      drawState.isShiftPressed = false;
    }
    document.addEventListener('keydown', setShiftPressed);
    document.addEventListener('keyup', resetShiftPressed);
    return () => {
      document.removeEventListener('keydown', setShiftPressed);
      document.removeEventListener('keyup', resetShiftPressed);
    };
  }, [drawState]);
}
