import { ThemeOptions } from '@mui/material';
import PropTypes from 'prop-types';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { LayoutDirection, ThemeMode } from '../../shared/constants/AppEnums';
import defaultConfig, {
  adminTheme,
  backgroundDark,
  backgroundLight,
  textDark,
  textLight,
} from './defaultConfig';

export interface ThemeData {
  theme: ThemeOptions;
  themeMode: string;
  themeStyle: string;
}

export interface ThemeActions {
  updateTheme: (theme: ThemeOptions) => void;
  updateThemeMode: (themeMode: string) => void;
  updateThemeStyle: (themeStyle: string) => void;
}

export const ThemeContext = createContext<ThemeData>({
  theme: adminTheme,
  themeMode: defaultConfig.themeMode,
  themeStyle: defaultConfig.themeStyle,
});

const ThemeActionsContext = createContext<ThemeActions>({
  updateTheme: () => {},
  updateThemeMode: () => {},
  updateThemeStyle: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const useThemeActionsContext = () => useContext(ThemeActionsContext);

const ThemeContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeOptions>(adminTheme);
  const [themeMode, updateThemeMode] = useState<string>(
    defaultConfig.themeMode,
  );
  const [themeStyle, updateThemeStyle] = useState<string>(
    defaultConfig.themeStyle,
  );

  const updateTheme = useCallback((theme: ThemeOptions) => {
    setTheme(theme);
  }, []);

  useEffect(() => {
    theme.palette = {
      ...theme.palette,
      mode: themeMode === ThemeMode.DARK ? ThemeMode.DARK : ThemeMode.LIGHT,
      background:
        themeMode === ThemeMode.DARK ? backgroundDark : backgroundLight,
      text: themeMode === ThemeMode.DARK ? textDark : textLight,
    };

    updateTheme(theme);
  }, [themeMode, theme, updateTheme]);

  useEffect(() => {
    if (theme.direction === LayoutDirection.RTL) {
      document.body.setAttribute('dir', LayoutDirection.RTL);
    } else {
      document.body.setAttribute('dir', LayoutDirection.LTR);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeStyle,
        themeMode,
      }}
    >
      <ThemeActionsContext.Provider
        value={{
          updateTheme,
          updateThemeStyle,
          updateThemeMode,
        }}
      >
        {children}
      </ThemeActionsContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
