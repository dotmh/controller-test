import {GAMEPAD_CONNECTED, GAMEPAD_DISCONNECTED} from './constants';
import {convertGamepadToController} from './helpers';
import {Controller, EventCallback} from './types';

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
export const getGamepad = (selectId: string): Gamepad | null => {
  return listGamepads().find(({id}) => id === selectId) ?? null;
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
