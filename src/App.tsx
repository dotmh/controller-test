import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import {Container} from 'reactstrap';
import './App.scss';
import {ControllerCanIUse} from './ui/controller/canUse';
import {ControllerSelector} from './ui/controller/selector';

function App() {
  const [selectedGamePad, setSelectedGamePad] = useState<Gamepad | null>(null);

  return (
    <div className="App">
      <Container>
        <ControllerCanIUse></ControllerCanIUse>
        <ControllerSelector
          onSelectGamepad={setSelectedGamePad}
        ></ControllerSelector>
      </Container>
    </div>
  );
}

export default App;
