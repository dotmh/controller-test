export const AXIS_OFFSET = 100;
export const GAMEPAD_CONNECTED = 'gamepadconnected';
export const GAMEPAD_DISCONNECTED = 'gamepaddisconnected';

export const GAMEPAD_ID_SEPERATOR = '-';

export enum ControllerTypes {
  DUALSHOCK4 = 'DUALSHOCK4',
  UNKNOWN = 'UNKNOWN',
}

export type IdMapping = Map<string, ControllerTypes>;

export enum Buttons {
  A = 'A',
  B = 'B',
  X = 'X',
  Y = 'Y',
}

export enum DPad {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum Triggers {
  R1 = 'R1',
  R2 = 'R2',
  R3 = 'R3',
  L1 = 'L1',
  L2 = 'L2',
  L3 = 'L3',
}

export enum Controls {
  SELECT = 'SELECT',
  START = 'START',
  HOME = 'HOME',
}

export enum Axis {
  LX = 'LEFT X',
  LY = 'LEFT Y',
  RX = 'RIGHT X',
  RY = 'RIGHT Y',
}

export type ControllerButtons = Buttons | DPad | Triggers | Controls;
export type ContollerInputs = ControllerButtons | Axis;
export type ControllerMapping = Map<number, ContollerInputs>;
export type Mapping = Map<GamepadMappingType, ControllerMapping>;

export const STANDARD_MAPPING: ControllerMapping = new Map();

STANDARD_MAPPING.set(0, Buttons.B);
STANDARD_MAPPING.set(1, Buttons.A);
STANDARD_MAPPING.set(2, Buttons.Y);
STANDARD_MAPPING.set(3, Buttons.X);
STANDARD_MAPPING.set(4, Triggers.L1);
STANDARD_MAPPING.set(5, Triggers.R1);
STANDARD_MAPPING.set(6, Triggers.L2);
STANDARD_MAPPING.set(7, Triggers.R2);
STANDARD_MAPPING.set(8, Controls.SELECT);
STANDARD_MAPPING.set(9, Controls.START);
STANDARD_MAPPING.set(10, Triggers.L3);
STANDARD_MAPPING.set(11, Triggers.R3);
STANDARD_MAPPING.set(12, DPad.UP);
STANDARD_MAPPING.set(13, DPad.DOWN);
STANDARD_MAPPING.set(14, DPad.LEFT);
STANDARD_MAPPING.set(15, DPad.RIGHT);
STANDARD_MAPPING.set(16, Controls.HOME);

STANDARD_MAPPING.set(100, Axis.LX);
STANDARD_MAPPING.set(101, Axis.LY);
STANDARD_MAPPING.set(102, Axis.RX);
STANDARD_MAPPING.set(103, Axis.RY);

export const mappings: Mapping = new Map();

mappings.set('standard', STANDARD_MAPPING);

export const idMapping: IdMapping = new Map();

idMapping.set('54c-5c4', ControllerTypes.DUALSHOCK4);

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

export interface GamepadId {
  vender: string;
  product: string;
  name: string;
}

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

export type EventCallback = () => void;

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

export const pollGamePad = (
  gamepad: Gamepad,
  pollCallback: (gamepad: Gamepad) => void,
  fps = 60
): number => {
  return setInterval(() => {
    const gamepadData = getGamepad(gamepad.id);
    if (gamepadData) {
      pollCallback(gamepadData);
    }
  }, 1000 / fps);
};
