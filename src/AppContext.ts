import { createContext, Dispatch, SetStateAction } from 'react';
import { EditorMode } from './types';

interface AppContext {
  editorMode: EditorMode;
  setEditorMode: Dispatch<SetStateAction<EditorMode>>;
}

const appContextDefaultValue: AppContext = {
  editorMode: EditorMode.Add,
  setEditorMode: () => {},
};

export const AppContext = createContext<AppContext>(appContextDefaultValue);
