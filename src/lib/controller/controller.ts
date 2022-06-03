import {
  AXIS_OFFSET,
  GAMEPAD_CONNECTED,
  GAMEPAD_DISCONNECTED,
  GAMEPAD_ID_SEPERATOR,
} from './constants';
import {idMapping, mappings, STANDARD_MAPPING} from './mapping';
import {
  Axis,
  AxisMap,
  ButtonMap,
  Controller,
  ControllerButtons,
  ControllerTypes,
  EventCallback,
  GamepadId,
} from './types';

export const asAxis = (axisId: number): number => AXIS_OFFSET + axisId;

export const axisId = (axis: Axis): number => {
  const data = [...STANDARD_MAPPING.entries()].find(
    ([, value]) => value === axis
  );
  if (data) {
    const [id] = data;
    return id - AXIS_OFFSET;
  }

  return 0;
};

export const axisInPercent = (axis: number): number => Math.round(axis * 100);

export const gamepadId = (idString: string): GamepadId => {
  const [vender, product, name] = idString.split(GAMEPAD_ID_SEPERATOR);
  return {
    vender,
    product,
    name,
  };
};

export const gamepadType = (idString: string): ControllerTypes => {
  const {vender, product} = gamepadId(idString);
  return idMapping.get(`${vender}-${product}`) ?? ControllerTypes.UNKNOWN;
};

export const canUseGamepadApi = (): boolean => 'getGamepads' in navigator;

export const canUseGamepadApiEvents = (): boolean =>
  'ongamepadconnected' in window && 'ongamepaddisconnected' in window;

export const hasGamepads = (): boolean =>
  navigator.getGamepads().filter(Boolean).length > 0;

export const listGamepads = (): Gamepad[] => {
  if (!canUseGamepadApi()) {
    return [];
  }

  const pads = navigator.getGamepads();

  if (pads && pads.filter(Boolean).length > 0) {
    return pads as Gamepad[];
  } else {
    return [];
  }
};

export const watchForGamepad = (eventCallback: EventCallback): void => {
  if (canUseGamepadApi()) {
    window.addEventListener(GAMEPAD_CONNECTED, eventCallback);
  }
};

export const watchForGamepadDisconnect = (
  eventCallback: EventCallback
): void => {
  if (canUseGamepadApi()) {
    window.addEventListener(GAMEPAD_DISCONNECTED, eventCallback);
  }
};

export const getGamepad = (selectId: string): Gamepad | null => {
  return listGamepads().find(({id}) => id === selectId) ?? null;
};

export const buttonMap = (
  buttons: readonly GamepadButton[],
  mapping: GamepadMappingType = 'standard'
): ButtonMap => {
  const buttonMap: ButtonMap = new Map();
  buttons.forEach((button: GamepadButton, index: number) => {
    const buttonMapping = mappings.get(mapping)?.get(index);
    if (buttonMapping) {
      buttonMap.set(buttonMapping as ControllerButtons, button);
    }
  });
  return buttonMap;
};

export const axisMap = (
  axis: readonly number[],
  mapping: GamepadMappingType = 'standard'
): {axisMap: AxisMap; axisPercentageMap: AxisMap} => {
  const axisMap: AxisMap = new Map();
  const axisPercentageMap: AxisMap = new Map();

  axis.forEach((axis: number, index: number) => {
    const axisMapping = mappings.get(mapping)?.get(asAxis(index));
    if (axisMapping) {
      axisMap.set(axisMapping as Axis, axis);
      axisPercentageMap.set(axisMapping as Axis, axisInPercent(axis));
    }
  });
  return {axisMap, axisPercentageMap};
};

export const convertGamepadToController = (gamepad: Gamepad): Controller => {
  const id = gamepadId(gamepad.id);
  const buttons = buttonMap(gamepad.buttons, gamepad.mapping);
  const type = gamepadType(gamepad.id);
  const {axisMap: axis, axisPercentageMap: axisPercentage} = axisMap(
    gamepad.axes,
    gamepad.mapping
  );
  return {
    id,
    buttons,
    type,
    axis,
    axisPercentage,
  };
};

export const pollGamePad = (
  gamepad: Gamepad,
  pollCallback: (controller: Controller) => void,
  fps = 60
): number => {
  return setInterval(() => {
    const gamepadData = getGamepad(gamepad.id);
    if (gamepadData) {
      pollCallback(convertGamepadToController(gamepad));
    }
  }, 1000 / fps);
};
