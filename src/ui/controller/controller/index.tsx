import React, {useEffect, useState} from 'react';
import {
  asAxis,
  axisInPercent,
  ControllerMapping,
  mappings,
  pollGamePad,
} from '../../../lib/controller';

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
      setButtons(gamepad.buttons ?? null);
      setMapping(
        mappings.has(gamepad.mapping)
          ? mappings.get(gamepad.mapping)
          : mappings.get('standard')
      );
      setId(gamepad.id);
      setAxis(gamepad.axes);
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {id}
      {buttons?.map((button, index) => (
        <div key={index}>
          {mapping && mapping.has(index) ? mapping.get(index) : 'unknown'} -{' '}
          {button.value} : {button.pressed ? 'Pressed' : ''}
        </div>
      ))}
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
