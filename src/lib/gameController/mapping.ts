import {
  Axis,
  Buttons,
  ControllerMapping,
  ControllerTypes,
  Controls,
  DPad,
  IdMapping,
  Mapping,
  Triggers,
} from './types';

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
