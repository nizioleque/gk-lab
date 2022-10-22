import { useContext } from 'react';
import { AppContext } from '../AppContext';
import './Menu.css';
import { EditorMode } from '../types';
import AnimateHeight from 'react-animate-height';
import ModeButton from './ModeButton';
import SceneButton from './SceneButton';
import scenes from '../scenes';
import RestrictionButton from './RestrictionButton';

function Menu() {
  const { editorMode, restrictionData } = useContext(AppContext);

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
          <ModeButton text='Prostopadłość' mode={EditorMode.SetPerpendicular} />
        </div>
      </div>
      <div className='menu-section'>
        <h3>Ograniczenia</h3>
        <div className='buttons'>
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
