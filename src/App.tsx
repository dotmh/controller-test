import {useState} from 'react';
import {Container, Navbar, NavbarBrand} from 'reactstrap';
import './App.scss';
import {ControllerCanIUse} from './ui/controller/canUse';
import {Controller} from './ui/controller/controller/controller';
import {ControllerSelector} from './ui/controller/selector';
import {ThemeContext, Themes, ThemeSelector} from './ui/themeSelector';

function App() {
  const [selectedGamePad, setSelectedGamePad] = useState<Gamepad | null>(null);

  return (
    <div className="App">
      <ThemeSelector defaultTheme={Themes.DARK}>
        <ThemeContext.Consumer>
          {(theme) => (
            <Navbar color={theme} dark>
              <NavbarBrand href="/">
                DotMH Games - Controller Checker
              </NavbarBrand>
            </Navbar>
          )}
        </ThemeContext.Consumer>

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
      </ThemeSelector>
    </div>
  );
}

export default App;
