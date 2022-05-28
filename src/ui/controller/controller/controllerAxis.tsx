import './controllerAxis.scss';

import React from 'react';
import {axisInPercent} from '../../../lib/controller';
import {AxisGraph} from '../axis';

export interface ControllerAxisProps {
  x: number;
  y: number;
  label: 'left' | 'right';
  divider?: string;
}

export const ControllerAxis = (props: ControllerAxisProps) => {
  return (
    <div className="controller-axis">
      <h2>{props.label}</h2>
      <div className="cords">
        {axisInPercent(props.x)} {props.divider ?? '/'} {axisInPercent(props.y)}
      </div>
      <AxisGraph
        width={200}
        height={200}
        xPercentage={axisInPercent(props.x)}
        yPercentage={axisInPercent(props.y)}
      ></AxisGraph>
    </div>
  );
};
