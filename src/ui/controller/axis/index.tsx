import React, {useEffect, useRef} from 'react';
import {CSSColor} from '../../../lib/cssColorType';

export interface CanvasProps {
  width: number;
  height: number;
  pointWidth: number;
  pointHeight: number;
  gap: number;
  lineWidth: number;
  background: CSSColor;
  lineColor: CSSColor;
  cursorColor: CSSColor;
}

export interface AxisGraphPointProps {
  xPercentage: number;
  yPercentage: number;
}

type AxisGraphProps = CanvasProps & AxisGraphPointProps;
type AxisGraphInputProps = Partial<CanvasProps> & AxisGraphPointProps;

export interface AxisGraphPoint {
  x: number;
  y: number;
}

const DefaultCanvasProps: CanvasProps = {
  width: 200,
  height: 200,
  pointWidth: 4,
  pointHeight: 4,
  gap: 10,
  lineWidth: 1,
  background: 'black',
  lineColor: 'rgba(204, 204, 204, 0.5)',
  cursorColor: 'limegreen',
};

const axisPostivePercentage = (axisInPercent: number): number => {
  // -100% to +100%
  return ((axisInPercent + 100) / 200) * 100;
};

const drawBackground = (
  context: CanvasRenderingContext2D,
  {width, height, background}: CanvasProps
) => {
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);
};

const drawGrid = (
  context: CanvasRenderingContext2D,
  {width, height, gap, lineWidth, lineColor}: AxisGraphProps
) => {
  context.fillStyle = lineColor;
  for (let i = 0; i <= width / gap; i++) {
    context.fillRect(i * gap, 0, lineWidth, height);
    context.fillRect(0, i * gap, width, lineWidth);
  }
};

const drawAxisPoint = (
  context: CanvasRenderingContext2D,
  {
    width,
    height,
    pointWidth,
    pointHeight,
    xPercentage: x,
    yPercentage: y,
    cursorColor,
  }: AxisGraphProps
) => {
  context.fillStyle = cursorColor;
  const xAxis = (width / 100) * axisPostivePercentage(x) - pointWidth / 2;
  const yAxis = (height / 100) * axisPostivePercentage(y) - pointHeight / 2;
  context.fillRect(xAxis, yAxis, pointWidth, pointHeight);
};

const draw = (
  context: CanvasRenderingContext2D,
  axisGraphProps: AxisGraphProps
) => {
  drawBackground(context, axisGraphProps);
  drawGrid(context, axisGraphProps);
  drawAxisPoint(context, axisGraphProps);
};

export const AxisGraph = (props: AxisGraphInputProps): JSX.Element => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current as HTMLCanvasElement;
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Unable to get context');
      }

      draw(context, {...DefaultCanvasProps, ...props} as AxisGraphProps);
    }
  }, [props.xPercentage, props.yPercentage]);

  return (
    <canvas width={props.width} height={props.height} ref={canvasRef}></canvas>
  );
};
