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

export const watchForGamepad = (eventCallback: () => void): void => {
  if (canUseGamepadApi()) {
    window.addEventListener('gamepadconnected', eventCallback);
  }
};
