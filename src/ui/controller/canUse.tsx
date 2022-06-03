import React from 'react';
import {Alert} from 'reactstrap';
import {
  canUseGamepadApi,
  canUseGamepadApiEvents,
} from '../../lib/gameController';

interface ControllerCanIUseProps {
  children: React.ReactNode;
}

export const ControllerCanIUse = (props: ControllerCanIUseProps) => {
  const testResults: JSX.Element[] = [];

  if (!canUseGamepadApi()) {
    testResults.push(
      <Alert color="danger">
        <strong>1</strong> - Sorry! The Gamepad API is <strong>not</strong>{' '}
        supported in your browser
      </Alert>
    );
  }

  if (!canUseGamepadApiEvents()) {
    testResults.push(
      <Alert color="danger">
        <strong>2</strong> - Sorry! The Gamepad API is <strong>not</strong>{' '}
        supported in your browser
      </Alert>
    );
  }

  return <>{testResults.length > 0 ? testResults : props.children}</>;
};
