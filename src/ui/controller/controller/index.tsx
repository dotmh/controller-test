import React, {useEffect, useState} from 'react';
import {
  asAxis,
  axisInPercent,
  ControllerButtons,
  ControllerMapping,
  mappings,
  pollGamePad,
} from '../../../lib/controller';
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
      {id}
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
      {axis?.map((axis, index) => (
        <div key={asAxis(index)}>
          {mapping && mapping.has(asAxis(index))
            ? mapping.get(asAxis(index))
            : 'unknown'}{' '}
          : {axisInPercent(axis)}%
        </div>
      ))}
    </>
  );
};
