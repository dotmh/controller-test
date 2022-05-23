import React, {useEffect, useState} from 'react';
import {
  ControllerMapping,
  mappings,
  pollGamePad,
} from '../../../lib/controller';

interface ControllerProps {
  gamepad: Gamepad;
}

export const Controller = (props: ControllerProps) => {
  const [timestamp, setTimestamp] = useState<number>(0);
  const [buttons, setButtons] = useState<readonly GamepadButton[] | null>(null);
  const [mapping, setMapping] = useState<ControllerMapping | null | undefined>(
    null
  );
  const [id, setId] = useState<string>('');

  useEffect(() => {
    const interval: number = pollGamePad(props.gamepad, (gamepad: Gamepad) => {
      setTimestamp(gamepad.timestamp ?? 0);
      setButtons(gamepad.buttons ?? null);
      setMapping(
        mappings.has(gamepad.mapping)
          ? mappings.get(gamepad.mapping)
          : mappings.get('standard')
      );
      setId(gamepad.id);
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {id}
      {buttons?.map((button, index) => (
        <div>
          {mapping && mapping.has(index) ? mapping.get(index) : 'unknown'} -{' '}
          {button.value} : {button.pressed ? 'Pressed' : ''}
        </div>
      ))}
    </>
  );
};
