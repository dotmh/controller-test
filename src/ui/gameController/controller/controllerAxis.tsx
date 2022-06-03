import './controllerAxis.scss';

import React, {useEffect, useRef, useState} from 'react';
import {AxisGraph} from '../axis';
import {CSSColor} from '../../../lib/cssColorType';

const AXIS_FORGROUND = '--axis-forground';
const AXIS_BACKGROUND = '--axis-background';
const AXIS_GRID = '--axis-grid';
export interface ControllerAxisProps {
  x: number | undefined;
  y: number | undefined;
  label: 'left' | 'right';
  divider?: string;
}

export const ControllerAxis = (props: ControllerAxisProps) => {
  const axisRef = useRef(null);

  const [background, setBackground] = useState<CSSColor | undefined>(undefined);
  const [lineColor, setLineColor] = useState<CSSColor | undefined>(undefined);
  const [cursorColor, setCursorColor] = useState<CSSColor | undefined>(
    undefined
  );

  if (props.x === undefined || props.y === undefined) {
    return <></>;
  }

  useEffect(() => {
    if (axisRef.current) {
      const containerElemet: HTMLDivElement = axisRef.current as HTMLDivElement;
      const computedStyle = getComputedStyle(containerElemet);
      setBackground(
        computedStyle.getPropertyValue(AXIS_BACKGROUND) as CSSColor
      );
      setLineColor(computedStyle.getPropertyValue(AXIS_GRID) as CSSColor);
      setCursorColor(
        computedStyle.getPropertyValue(AXIS_FORGROUND) as CSSColor
      );
    }
  }, []);

  return (
    <div className="controller-axis" ref={axisRef}>
      <h2>{props.label}</h2>
      <div className="cords">
        {props.x} {props.divider ?? ','} {props.y}
      </div>
      <AxisGraph
        width={200}
        height={200}
        xPercentage={props.x}
        yPercentage={props.y}
        background={background}
        lineColor={lineColor}
        cursorColor={cursorColor}
      ></AxisGraph>
    </div>
  );
};
