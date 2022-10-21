import { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import { EditorMode } from '../types';

interface ModeButtonProps {
  text: string;
  mode: EditorMode;
}

function ModeButton({ text, mode }: ModeButtonProps) {
  const { editorMode, setEditorMode } = useContext(AppContext);

  const index = mode + 1;

  useEffect(() => {
    function keyboardShortcut(event: KeyboardEvent) {
      if (event.key === index.toString()) {
        setEditorMode(mode);
      }
    }
    document.addEventListener('keydown', keyboardShortcut);
    return () => document.removeEventListener('keydown', keyboardShortcut);
  }, []);

  return (
    <button
      onClick={() => setEditorMode(mode)}
      className={`menu-button ${editorMode === mode ? 'active' : ''}`}
    >
      <div className='shortcut-key key'>{index}</div>
      {text}
    </button>
  );
}

export default ModeButton;
