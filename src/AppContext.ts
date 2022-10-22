import { createContext, Dispatch, RefObject, SetStateAction } from 'react';
import Line from './class/Line';
import Polygon from './class/Polygon';
import { Restriction, RestrictionData } from './class/Restriction';
import { SceneGenerator } from './scenes';
import { EditorMode, PolygonWith } from './types';

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
  lengthInputRef: RefObject<HTMLInputElement>;
  lengthRestrictionLine: PolygonWith<Line> | undefined;
  setLengthRestrictionLine: Dispatch<
    SetStateAction<PolygonWith<Line> | undefined>
  >;
  addLengthRestriction: () => void;
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
  lengthInputRef: { current: null },
  lengthRestrictionLine: undefined,
  setLengthRestrictionLine: () => {},
  addLengthRestriction: () => {},
};

export const AppContext = createContext<AppContext>(appContextDefaultValue);
