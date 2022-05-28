import React from 'react';
import {axisInPercent} from '../../../lib/controller';

export interface ControllerAxisProps {
  x: number;
  y: number;
}

export const ControllerAxis = (props: ControllerAxisProps) => {
  return (
    <div className="controller-axis">
      {axisInPercent(props.x)} - {axisInPercent(props.y)}
    </div>
  );
};
