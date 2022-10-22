import { createContext, Dispatch, SetStateAction } from 'react';
import Polygon from './class/Polygon';
import { Restriction, RestrictionData } from './class/Restriction';
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
  hoveredRestriction: Restriction | undefined;
  setHoveredRestriction: (restriction: Restriction | undefined) => void;
}

const appContextDefaultValue: AppContext = {
  editorMode: EditorMode.Draw,
  setEditorMode: () => {},
  polygons: [],
  addPolygon: () => {},
  removePolygon: () => {},
  applyScene: () => {},
  restrictionData: new RestrictionData(),
  hoveredRestriction: undefined,
  setHoveredRestriction: () => {},
};

export const AppContext = createContext<AppContext>(appContextDefaultValue);
