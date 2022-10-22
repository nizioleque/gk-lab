import { useState, useCallback } from 'react';

export default function useForceRerender() {
  const [, updateState] = useState();
  const forceRerender = useCallback(() => updateState({} as any), []);

  return { forceRerender };
}
