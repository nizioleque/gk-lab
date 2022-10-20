import Canvas from './Canvas';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  console.log('rendered app');

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const updateCanvasSize = () => {
    if (!canvasContainerRef.current) {
      console.error('canvas ref is undefined');
      return;
    }
    console.log('update canvas size to', {
      width: canvasContainerRef.current.offsetWidth,
      height: canvasContainerRef.current.offsetHeight,
    });
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
      <div className='menu'>
        <h1>Menu</h1>
      </div>
      <div className='canvas-container' ref={canvasContainerRef}>
        <Canvas size={canvasSize} />
      </div>
    </div>
  );
}

export default App;
