import {Buttons, Controls, DPad, Triggers} from '../../../../../lib/controller';
import {ImageMap} from '..';
import {
  Background,
  Circle,
  Down,
  Home,
  Icon,
  Left,
  AnalogueStick,
  Option,
  Right,
  Share,
  Square,
  Triangle,
  Up,
  X,
} from './top';

export const dualshock4ImageMap: ImageMap = new Map();

dualshock4ImageMap.set(Buttons.A, Circle);
dualshock4ImageMap.set(Buttons.B, X);
dualshock4ImageMap.set(Buttons.X, Triangle);
dualshock4ImageMap.set(Buttons.Y, Square);

dualshock4ImageMap.set(Triggers.L3, AnalogueStick);
dualshock4ImageMap.set(Triggers.R3, AnalogueStick);

dualshock4ImageMap.set(Controls.SELECT, Option);
dualshock4ImageMap.set(Controls.START, Share);
dualshock4ImageMap.set(Controls.HOME, Home);

dualshock4ImageMap.set(DPad.UP, Up);
dualshock4ImageMap.set(DPad.DOWN, Down);
dualshock4ImageMap.set(DPad.LEFT, Left);
dualshock4ImageMap.set(DPad.RIGHT, Right);

dualshock4ImageMap.set('BACKGROUND_TOP', Background);
dualshock4ImageMap.set('ICON', Icon);
