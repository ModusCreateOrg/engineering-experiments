import React, {
  FC,
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

import { darkTheme, lightTheme } from './themes';

type ThemeVariants = 'light' | 'dark';
type ThemeColorShadeKeys = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
type ThemeColorShades = Record<ThemeColorShadeKeys, string>;
type ThemeColorTypes = 'neutral' | 'primary';

export type Theme = {
  variant: ThemeVariants;
  color: Record<ThemeColorTypes, ThemeColorShades>;
};

interface IThemeContext {
  theme: Theme;
  toggleTheme: (variant: ThemeVariants) => void;
}

const ThemeContext = createContext({} as IThemeContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: FC = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();

  const [theme, setTheme] = useState<Theme>(
    colorScheme === 'light' ? lightTheme : darkTheme
  );

  const toggleTheme = (variant: ColorSchemeName) =>
    setTheme(variant === 'light' ? lightTheme : darkTheme);

  useEffect(() => {
    Appearance.addChangeListener((e) => toggleTheme(e.colorScheme));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
