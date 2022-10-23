import { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import './Menu.css';
import { EditorMode } from '../types';
import AnimateHeight from 'react-animate-height';
import ModeButton from './ModeButton';
import SceneButton from './SceneButton';
import scenes from '../scenes';
import RestrictionButton from './RestrictionButton';
import bresenham from '../bresenham';

function Menu() {
  const {
    editorMode,
    restrictionData,
    lengthInputRef,
    addLengthRestriction,
    lengthRestrictionLine,
    canvasRef,
    canvasSize,
    polygons,
  } = useContext(AppContext);

  useEffect(() => {
    if (lengthRestrictionLine && lengthInputRef.current) {
      lengthInputRef.current.value = lengthRestrictionLine.element
        .length()
        .toString();
    } else if (lengthRestrictionLine === undefined && lengthInputRef.current) {
      lengthInputRef.current.value = '';
    }
  }, [lengthRestrictionLine]);

  return (
    <div className='menu'>
      <div className='menu-section'>
        <h3>Narzędzia</h3>
        <div className='buttons'>
          <ModeButton text='Rysowanie' mode={EditorMode.Draw} />

          <ModeButton text='Przesuwanie' mode={EditorMode.Move} />
          <AnimateHeight
            height={editorMode === EditorMode.Move ? 'auto' : 0}
            duration={300}
            easing='ease-in-out'
          >
            <div className='menu-caption'>
              Przytrzymaj <span className='key'>SHIFT</span>, aby przesunąć cały
              wielokąt
            </div>
          </AnimateHeight>

          <ModeButton text='Usuwanie' mode={EditorMode.Delete} />
          <AnimateHeight
            height={editorMode === EditorMode.Delete ? 'auto' : 0}
            duration={300}
            easing='ease-in-out'
          >
            <div className='menu-caption'>
              Przytrzymaj <span className='key'>SHIFT</span>, aby usunąć cały
              wielokąt
            </div>
          </AnimateHeight>

          <ModeButton text='Podział krawędzi' mode={EditorMode.Split} />

          <h5>Nowe ograniczenie</h5>

          <ModeButton text='Długość' mode={EditorMode.SetLength} />
          <AnimateHeight
            height={editorMode === EditorMode.SetLength ? 'auto' : 0}
            duration={300}
            easing='ease-in-out'
          >
            <div className='menu-caption'>
              Wybierz krawędź, następnie wprowadź długość i kliknij OK.
            </div>
            <div className='horizontal'>
              <input placeholder='100' ref={lengthInputRef} />
              <button onClick={() => addLengthRestriction()}>OK</button>
            </div>
          </AnimateHeight>

          <ModeButton text='Prostopadłość' mode={EditorMode.SetPerpendicular} />
          <AnimateHeight
            height={editorMode === EditorMode.SetPerpendicular ? 'auto' : 0}
            duration={300}
            easing='ease-in-out'
          >
            <div className='menu-caption'>
              Kliknij na dwie krawędzie, aby utworzyć między nimi ograniczenie
              prostopadłości.
            </div>
          </AnimateHeight>

          <h5>Zapisz jako obraz</h5>
          <ModeButton
            text='Algorytm biblioteczny'
            onClick={() => {
              const link = document.createElement('a');
              link.download = 'Norbert Niziołek - algorytm biblioteczny.png';
              link.href = canvasRef.current?.toDataURL() ?? '';
              link.click();
            }}
          />
          <ModeButton
            text='Algorytm Bresenhama'
            onClick={() => {
              const link = document.createElement('a');
              const canvas = document.createElement('canvas');
              canvas.height = canvasSize.height * canvasSize.pixelRatio;
              canvas.width = canvasSize.width * canvasSize.pixelRatio;
              bresenham(canvas, polygons);
              link.download = 'Norbert Niziołek - algorytm Bresenhama.png';
              link.href = canvas.toDataURL() ?? '';
              link.click();
            }}
          />
        </div>
      </div>
      <div className='menu-section'>
        <h3>Ograniczenia</h3>
        <div className='buttons'>
          {restrictionData.restrictions.length === 0 && (
            <div className='menu-caption center'>
              Brak zdefiniowanych ograniczeń
            </div>
          )}
          {restrictionData.restrictions.map((r, i) => (
            <RestrictionButton key={i} restriction={r} />
          ))}
        </div>
      </div>
      <div className='menu-section'>
        <h3>Sceny</h3>
        <div className='buttons'>
          {scenes.map((scene) => (
            <SceneButton key={scene.name} scene={scene} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
