import Canvas from './Canvas';
import './App.css';
import { createContext, useEffect, useRef, useState } from 'react';
import Menu from './Menu';
import { EditorMode } from './types';
import { AppContext } from './AppContext';

function App() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const updateCanvasSize = () => {
    if (!canvasContainerRef.current) return;
    setCanvasSize({
      width: canvasContainerRef.current.offsetWidth,
      height: canvasContainerRef.current.offsetHeight,
    });
  };

  const [editorMode, setEditorMode] = useState<EditorMode>(EditorMode.Add);

  useEffect(() => {
    updateCanvasSize();
    const resizeHandler = () => {
      updateCanvasSize();
    };
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <AppContext.Provider
      value={{
        editorMode,
        setEditorMode,
      }}
    >
      <div className='App'>
        <Menu />
        <div className='canvas-container' ref={canvasContainerRef}>
          <Canvas size={canvasSize} />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
