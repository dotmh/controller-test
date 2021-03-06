import React, {useEffect, useState} from 'react';
import {
  Alert,
  Badge,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import {NONE} from '../../lib/constants';
import {
  gamepadId,
  hasGamepads,
  listGamepads,
  watchForGamepad,
  watchForGamepadDisconnect,
} from '../../lib/gameController';

export interface ControllerSelecterProps {
  onSelectGamepad: (gamePad: Gamepad | null) => void;
}

export const ControllerSelector = ({
  onSelectGamepad,
}: ControllerSelecterProps) => {
  const [gamePads, setGamePads] = useState<Gamepad[]>([]);

  useEffect(() => {
    setGamePads(listGamepads());

    watchForGamepad(() => {
      setGamePads(listGamepads());
    });

    watchForGamepadDisconnect(() => {
      onSelectGamepad(null);
      setGamePads([]);
    });
  }, []);

  const onChange = (event: React.ChangeEvent) => {
    const element: HTMLSelectElement = event.target as HTMLSelectElement;
    if (element.value === NONE) {
      onSelectGamepad(null);
    } else {
      onSelectGamepad(gamePads.find(({id}) => id === element.value) ?? null);
    }
  };

  if (hasGamepads()) {
    return (
      <Card>
        <CardBody>
          <CardTitle>
            Game Controller{' '}
            <Badge pill color="primary">
              {gamePads.length}
            </Badge>
          </CardTitle>
          <FormGroup>
            <Label for="gamepadSelector">Select A Game Controller</Label>
            <Input
              id="gamepadSelector"
              type="select"
              name="gamepadSelector"
              onChange={onChange}
            >
              <option value={NONE}>No Controller Selected</option>
              {gamePads.map((gamePad) => {
                return (
                  <option value={gamePad.id} key={gamePad.id}>
                    {gamepadId(gamePad.id).name}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
        </CardBody>
      </Card>
    );
  }

  return <Alert color="warning">No Game Controllers Detected!</Alert>;
};
