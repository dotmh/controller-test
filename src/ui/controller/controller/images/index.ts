import {Fragment} from 'react';
import {ContollerInputs, ControllerTypes} from '../../../../lib/controller';
import {SVG} from '../../../../lib/types';
import {dualshock4ImageMap} from './dualshock4';

export type ImageBackgrounds = 'BACKGROUND_TOP' | 'BACKGROUND_ALT';

export type ImageKey = ContollerInputs | ImageBackgrounds;
export type ImageMap = Map<ImageKey, SVG>;
export type ControllerImageMap = Map<ControllerTypes, ImageMap>;

export const controllerImageMap: ControllerImageMap = new Map();

controllerImageMap.set(ControllerTypes.DUALSHOCK4, dualshock4ImageMap);

export const controllerImage = (type: ControllerTypes, key: ImageKey) => {
  const svg: SVG | null = controllerImageMap.get(type)?.get(key) ?? null;
  if (svg) {
    return svg({});
  } else {
    return Fragment;
  }
};
