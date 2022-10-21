import { createContext, Dispatch, SetStateAction } from 'react';
import Polygon from './class/Polygon';
import { SceneGenerator } from './scenes';
import { EditorMode } from './types';

interface AppContext {
  editorMode: EditorMode;
  setEditorMode: Dispatch<SetStateAction<EditorMode>>;
  polygons: Polygon[];
  addPolygon: (polygon: Polygon) => void;
  removePolygon: (polygon: Polygon) => void;
  applyScene: (scene: SceneGenerator) => void;
}

const appContextDefaultValue: AppContext = {
  editorMode: EditorMode.Draw,
  setEditorMode: () => {},
  polygons: [],
  addPolygon: () => {},
  removePolygon: () => {},
  applyScene: () => {},
};

export const AppContext = createContext<AppContext>(appContextDefaultValue);
