import { useContext } from 'react';
import { AppContext } from '../AppContext';
import './Menu.css';
import { EditorMode } from '../types';

interface ModeButtonProps {
  text: string;
  mode: EditorMode;
}

const ModeButton = ({ text, mode }: ModeButtonProps) => {
  const { editorMode, setEditorMode } = useContext(AppContext);

  return (
    <button
      onClick={() => setEditorMode(mode)}
      className={editorMode === mode ? 'active' : undefined}
    >
      {text}
    </button>
  );
};

function Menu() {
  const { editorMode } = useContext(AppContext);

  return (
    <div className='menu'>
      <div className='menu-section'>
        <h3>Narzędzia</h3>
        <div className='buttons'>
          <ModeButton text='Rysowanie' mode={EditorMode.Draw} />
          <ModeButton text='Przesuwanie' mode={EditorMode.Move} />
          {editorMode === EditorMode.Move && (
            <div className='menu-caption'>
              Przytrzymaj <span className='key'>SHIFT</span>, aby przesunąć cały
              wielokąt
            </div>
          )}
          <ModeButton text='Usuwanie' mode={EditorMode.Delete} />
        </div>
      </div>
      <div className='menu-section'>
        <h3>Relacje</h3>
      </div>
      <div className='menu-section'>
        <h3>Sceny</h3>
      </div>
    </div>
  );
}

export default Menu;
