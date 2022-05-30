import './controller.scss';

import React, {useEffect, useState} from 'react';
import {
  Axis,
  axisId,
  ControllerButtons,
  ControllerMapping,
  ControllerTypes,
  gamepadId,
  gamepadType,
  mappings,
  pollGamePad,
} from '../../../lib/controller';
import {ControllerAxis} from './controllerAxis';
import {ControllerButton} from './controllerButton';
import {controllerImage} from './images';

interface ControllerProps {
  gamepad: Gamepad;
}

export const Controller = (props: ControllerProps) => {
  const [buttons, setButtons] = useState<readonly GamepadButton[] | null>(null);
  const [mapping, setMapping] = useState<ControllerMapping | null | undefined>(
    null
  );
  const [id, setId] = useState<string>('');
  const [axis, setAxis] = useState<readonly number[]>([]);
  const [useGamepadType, setUseGamepadType] = useState<ControllerTypes>(
    ControllerTypes.UNKNOWN
  );

  useEffect(() => {
    const interval: number = pollGamePad(props.gamepad, (gamepad: Gamepad) => {
      setButtons([...gamepad.buttons] ?? null);
      setMapping(
        mappings.has(gamepad.mapping)
          ? mappings.get(gamepad.mapping)
          : mappings.get('standard')
      );
      setId(gamepad.id);
      setAxis([...gamepad.axes]);
      setUseGamepadType(gamepadType(gamepad.id));
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="controller">
      <h1>Controller : {gamepadId(id).name}</h1>
      <div className={`controller-layout ${useGamepadType.toLowerCase()}`}>
        <>{controllerImage(useGamepadType, 'ICON')}</>
        <div className="controller-buttons">
          {buttons?.map((button, index) => {
            const controllerButton: ControllerButtons | null =
              mapping && mapping.has(index)
                ? (mapping.get(index) as ControllerButtons)
                : null;
            return (
              <ControllerButton
                key={index}
                button={controllerButton}
                pressed={button.pressed}
                value={button.value}
                image={controllerImage(useGamepadType, controllerButton)}
              ></ControllerButton>
            );
          })}
        </div>

        <div className="controller-axises">
          <ControllerAxis
            label="left"
            x={axis[axisId(Axis.LX)]}
            y={axis[axisId(Axis.LY)]}
          ></ControllerAxis>

          <ControllerAxis
            label="right"
            x={axis[axisId(Axis.RX)]}
            y={axis[axisId(Axis.RY)]}
          ></ControllerAxis>
        </div>
      </div>
    </div>
  );
};
