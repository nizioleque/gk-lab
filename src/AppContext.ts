import { createContext, Dispatch, SetStateAction } from 'react';
import Polygon from './class/Polygon';
import RestrictionData from './class/Restriction';
import { SceneGenerator } from './scenes';
import { EditorMode } from './types';

interface AppContext {
  editorMode: EditorMode;
  setEditorMode: Dispatch<SetStateAction<EditorMode>>;
  polygons: Polygon[];
  addPolygon: (polygon: Polygon) => void;
  removePolygon: (polygon: Polygon) => void;
  applyScene: (scene: SceneGenerator) => void;
  restrictionData: RestrictionData;
}

const appContextDefaultValue: AppContext = {
  editorMode: EditorMode.Draw,
  setEditorMode: () => {},
  polygons: [],
  addPolygon: () => {},
  removePolygon: () => {},
  applyScene: () => {},
  restrictionData: new RestrictionData(),
};

export const AppContext = createContext<AppContext>(appContextDefaultValue);
