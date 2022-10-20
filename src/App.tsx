import Canvas from './Canvas';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Menu from './Menu';

function App() {
  console.log('rendered app');

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const updateCanvasSize = () => {
    if (!canvasContainerRef.current) return;
    setCanvasSize({
      width: canvasContainerRef.current.offsetWidth,
      height: canvasContainerRef.current.offsetHeight,
    });
  };

  useEffect(() => {
    updateCanvasSize();
    const resizeHandler = () => {
      updateCanvasSize();
    };
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <div className='App'>
      <Menu />
      <div className='canvas-container' ref={canvasContainerRef}>
        <Canvas size={canvasSize} />
      </div>
    </div>
  );
}

export default App;
