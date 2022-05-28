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
    <div className={props.pressed ? 'pressed' : 'notPressed'}>
      {props.button ?? 'Unknown'} {props.value}
    </div>
  );
};
