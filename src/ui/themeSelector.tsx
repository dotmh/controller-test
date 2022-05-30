import {createContext, useEffect, useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

export const ThemeContext = createContext('dark');

export enum Themes {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface ThemeSelectorProps {
  children: React.ReactNode;
  defaultTheme: Themes;
}

const CSS_COLOR_SCHEME = '(prefers-color-scheme: dark)';

export const ThemeSelector = (props: ThemeSelectorProps) => {
  const [theme, setTheme] = useState<Themes>(props.defaultTheme);
  const [userset, setUserset] = useState<boolean>(false);

  const detectAndSetTheme = () => {
    if (window.matchMedia && !userset) {
      if (window.matchMedia(CSS_COLOR_SCHEME).matches) {
        setTheme(Themes.DARK);
      } else {
        setTheme(Themes.LIGHT);
      }
    }
  };

  useEffect(() => {
    detectAndSetTheme();

    if (window.matchMedia) {
      window
        .matchMedia(CSS_COLOR_SCHEME)
        .addEventListener('change', detectAndSetTheme);
    }
  }, []);

  return (
    <div className={theme}>
      <ThemeContext.Provider value={theme}>
        {props.children}
      </ThemeContext.Provider>
    </div>
  );
};
