import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import {Container, Navbar, NavbarBrand} from 'reactstrap';
import './App.scss';
import {ControllerCanIUse} from './ui/controller/canUse';
import {Controller} from './ui/controller/controller';
import {ControllerSelector} from './ui/controller/selector';

function App() {
  const [selectedGamePad, setSelectedGamePad] = useState<Gamepad | null>(null);

  return (
    <div className="App">
      <Navbar color="dark" dark>
        <NavbarBrand href="/">DotMH Games - Controller Checker</NavbarBrand>
      </Navbar>
      <Container>
        <ControllerCanIUse>
          <ControllerSelector
            onSelectGamepad={setSelectedGamePad}
          ></ControllerSelector>
          {selectedGamePad ? (
            <Controller gamepad={selectedGamePad}></Controller>
          ) : (
            <></>
          )}
        </ControllerCanIUse>
      </Container>
    </div>
  );
}

export default App;
