import React, {useEffect, useState} from 'react';
import {
  Axis,
  axisId,
  ControllerButtons,
  ControllerMapping,
  mappings,
  pollGamePad,
} from '../../../lib/controller';
import {ControllerAxis} from './controllerAxis';
import {ControllerButton} from './controllerButton';

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
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>Controller : {id}</h1>
      {buttons?.map((button, index) => {
        return (
          <ControllerButton
            key={index}
            button={
              mapping && mapping.has(index)
                ? (mapping.get(index) as ControllerButtons)
                : null
            }
            pressed={button.pressed}
            value={button.value}
          ></ControllerButton>
        );
      })}
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
    </>
  );
};
