import './controller.scss';

import React, {useEffect, useState} from 'react';
import {
  Axis,
  Buttons,
  Controller,
  ControllerButtons,
  Controls,
  DPad,
  pollGamePad,
  Triggers,
} from '../../../lib/gameController';
import {ControllerAxis} from './controllerAxis';
import {ControllerButton} from './controllerButton';
import {controllerImage} from './images';

export type View = 'TOP' | 'ALT';
export type ViewButtonSet = Set<ControllerButtons>;
export type ViewMap = Map<View, ViewButtonSet>;

interface ControllerProps {
  gamepad: Gamepad;
}

export const GameController = (props: ControllerProps) => {
  const [controller, setController] = useState<Controller | null>(null);

  const viewMap: ViewMap = new Map();
  const topButtonSet: ViewButtonSet = new Set([
    DPad.UP,
    DPad.DOWN,
    DPad.LEFT,
    DPad.RIGHT,
    Triggers.R3,
    Triggers.L3,
    Controls.HOME,
    Controls.SELECT,
    Controls.START,
    Buttons.A,
    Buttons.B,
    Buttons.X,
    Buttons.Y,
  ]);

  const altButtonSet: ViewButtonSet = new Set([
    Triggers.L1,
    Triggers.L2,
    Triggers.R1,
    Triggers.R2,
  ]);

  viewMap.set('TOP', topButtonSet);
  viewMap.set('ALT', altButtonSet);

  useEffect(() => {
    const interval: number = pollGamePad(
      props.gamepad,
      (controllerData: Controller) => {
        setController({...controllerData});
      }
    );

    return () => clearInterval(interval);
  }, []);

  if (!controller) {
    return <></>;
  }

  return (
    <div className={`controller ${controller.type.toLowerCase()}`}>
      <h1>Controller : {controller?.id.name}</h1>

      <div className="controller-alt">
        <div className="controller-layout">
          <>{controllerImage(controller.type, 'BACKGROUND_ALT')}</>
          <div className="controller-buttons">
            {[...(viewMap.get('ALT') ?? [])].map((button, index) => {
              return (
                <ControllerButton
                  key={index}
                  button={button}
                  pressed={controller.buttons.get(button)?.pressed ?? false}
                  value={controller.buttons.get(button)?.value ?? 0}
                  image={controllerImage(controller?.type, button)}
                ></ControllerButton>
              );
            })}
          </div>
        </div>
      </div>

      <div className="controller-top">
        <div className="controller-layout">
          <>{controllerImage(controller.type, 'BACKGROUND_TOP')}</>
          <div className="controller-buttons">
            {[...(viewMap.get('TOP') ?? [])].map((button, index) => {
              return (
                <ControllerButton
                  key={index}
                  button={button}
                  pressed={controller.buttons.get(button)?.pressed ?? false}
                  value={controller.buttons.get(button)?.value ?? 0}
                  image={controllerImage(controller?.type, button)}
                ></ControllerButton>
              );
            })}
          </div>
        </div>
        <div className="controller-axises">
          <ControllerAxis
            label="left"
            x={controller.axisPercentage.get(Axis.LX)}
            y={controller.axisPercentage.get(Axis.LY)}
          ></ControllerAxis>

          <ControllerAxis
            label="right"
            x={controller.axisPercentage.get(Axis.RX)}
            y={controller.axisPercentage.get(Axis.RY)}
          ></ControllerAxis>
        </div>
      </div>
    </div>
  );
};
