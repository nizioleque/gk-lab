import { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import { EditorMode } from '../types';

interface ModeButtonProps {
  text: string;
  mode?: EditorMode;
  onClick?: () => void;
}

function ModeButton({ text, mode, onClick }: ModeButtonProps) {
  const { editorMode, setEditorMode } = useContext(AppContext);

  const index = mode !== undefined ? mode + 1 : undefined;

  useEffect(() => {
    function keyboardShortcut(event: KeyboardEvent) {
      if (editorMode === EditorMode.SetLength) return;
      if (event.key === index?.toString()) {
        mode !== undefined && setEditorMode(mode);
      }
    }
    document.addEventListener('keydown', keyboardShortcut);
    return () => document.removeEventListener('keydown', keyboardShortcut);
  }, [editorMode]);

  return (
    <button
      onClick={() => {
        mode !== undefined && setEditorMode(mode);
        onClick && onClick();
      }}
      className={`menu-button ${editorMode === mode ? 'active' : ''}`}
    >
      {index && <div className='shortcut-key key'>{index}</div>}
      {text}
    </button>
  );
}

export default ModeButton;
