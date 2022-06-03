import './dualshock4/dualshock4.scss';

import {ExoticComponent, Fragment} from 'react';
import {ContollerInputs, ControllerTypes} from '../../../../lib/gameController';
import {SVG} from '../../../../lib/types';
import {dualshock4ImageMap} from './dualshock4';

export type ImageBackgrounds = 'BACKGROUND_TOP' | 'BACKGROUND_ALT' | 'ICON';

export type ImageKey = ContollerInputs | ImageBackgrounds;
export type ImageMap = Map<ImageKey, SVG>;
export type ControllerImageMap = Map<ControllerTypes, ImageMap>;

export const controllerImageMap: ControllerImageMap = new Map();

controllerImageMap.set(ControllerTypes.DUALSHOCK4, dualshock4ImageMap);

export const controllerImage = (
  type: ControllerTypes,
  key: ImageKey | null
): React.ReactElement | ExoticComponent => {
  if (!key) {
    return Fragment;
  }
  const svg: SVG | null = controllerImageMap.get(type)?.get(key) ?? null;
  if (svg) {
    const svgElement = svg({});
    return svgElement ? svgElement : Fragment;
  } else {
    return Fragment;
  }
};
