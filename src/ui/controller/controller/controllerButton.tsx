import './controllerButton.scss';

import React from 'react';
import {ControllerButtons} from '../../../lib/controller';

export interface ControllerButtonProps {
  button: ControllerButtons | null | undefined;
  pressed: boolean;
  value: number;
  key: number;
}

export const ControllerButton = (props: ControllerButtonProps) => {
  return (
    <div
      className={[
        'button',
        props.pressed ? 'pressed' : 'notPressed',
        `button-${props.button?.toLowerCase() ?? 'Unknown'}`,
      ].join(' ')}
    >
      <div className="pressedStrength" style={{opacity: props.value}}></div>
      {props.button ?? 'Unknown'}
    </div>
  );
};
