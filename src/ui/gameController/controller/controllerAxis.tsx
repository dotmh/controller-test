import './controllerAxis.scss';

import React from 'react';
import {AxisGraph} from '../axis';

export interface ControllerAxisProps {
  x: number | undefined;
  y: number | undefined;
  label: 'left' | 'right';
  divider?: string;
}

export const ControllerAxis = (props: ControllerAxisProps) => {
  if (props.x === undefined || props.y === undefined) {
    return <></>;
  }

  return (
    <div className="controller-axis">
      <h2>{props.label}</h2>
      <div className="cords">
        {props.x} {props.divider ?? ','} {props.y}
      </div>
      <AxisGraph
        width={200}
        height={200}
        xPercentage={props.x}
        yPercentage={props.y}
      ></AxisGraph>
    </div>
  );
};
