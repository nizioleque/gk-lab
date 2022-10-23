import Canvas from './components/Canvas';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Menu from './components/Menu';
import { EditorMode } from './types';
import { AppContext } from './AppContext';
import usePolygons from './hooks/usePolygons';
import { SceneGenerator } from './scenes';
import useHoveredRestriction from './hooks/useHoveredRestriction';
import useAddLengthRestriction from './hooks/useAddLengthRestriction';
import useForceRerender from './hooks/useForceRerender';
import RestrictionData from './class/RestrictionData';
import Polygon from './class/Polygon';
import useError from './hooks/useError';

function App() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const updateCanvasSize = () => {
    if (!canvasContainerRef.current) return;
    setCanvasSize({
      width: canvasContainerRef.current.offsetWidth,
      height: canvasContainerRef.current.offsetHeight,
    });
  };
  const { forceRerender } = useForceRerender();

  const [editorMode, setEditorMode] = useState<EditorMode>(EditorMode.Draw);

  const [restrictionData, setRestrictionData] = useState<RestrictionData>(
    new RestrictionData()
  );

  const { polygons, addPolygon, removePolygon, setPolygons } =
    usePolygons(restrictionData);

  const { hoveredRestriction, setHoveredRestriction } = useHoveredRestriction();

  const { showError, errorText, setErrorText } = useError();

  const {
    lengthInputRef,
    lengthRestrictionLine,
    setLengthRestrictionLine,
    addLengthRestriction,
  } = useAddLengthRestriction(restrictionData, setErrorText, polygons);

  const applyScene = (scene: SceneGenerator) => {
    const newSceneData = scene.data();
    setPolygons(newSceneData.polygons);
    setRestrictionData(newSceneData.restrictionData);
    Polygon.applyRestrictions(
      newSceneData.polygons,
      newSceneData.restrictionData,
      []
    );
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
    <AppContext.Provider
      value={{
        editorMode,
        setEditorMode,
        polygons,
        addPolygon,
        removePolygon,
        applyScene,
        restrictionData,
        hoveredRestriction,
        setHoveredRestriction,
        lengthInputRef,
        lengthRestrictionLine,
        setLengthRestrictionLine,
        addLengthRestriction,
        forceRerender,
        canvasRef,
        canvasSize,
        setErrorText
      }}
    >
      <div className='App'>
        <Menu />
        <div className='canvas-container' ref={canvasContainerRef}>
          <Canvas />
        </div>
      </div>
      <div className={`alert ${showError ? 'show' : ''}`}>
        <div className='alert-icon'>⚠️</div>
        <div>{errorText}</div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
