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

export interface GamepadId {
  vender: string;
  product: string;
  name: string;
}

export type EventCallback = () => void;

export type ButtonMap = Map<ControllerButtons, GamepadButton>;
export type AxisMap = Map<Axis, number>;
export interface Controller {
  id: GamepadId;
  buttons: ButtonMap;
  type: ControllerTypes;
  axis: AxisMap;
  axisPercentage: AxisMap;
}
