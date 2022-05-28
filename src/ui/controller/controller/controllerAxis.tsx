import React from 'react';
import {axisInPercent} from '../../../lib/controller';
import {AxisGraph} from '../axis';

export interface ControllerAxisProps {
  x: number;
  y: number;
}

export const ControllerAxis = (props: ControllerAxisProps) => {
  return (
    <div className="controller-axis">
      <div>
        {axisInPercent(props.x)} - {axisInPercent(props.y)}
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
