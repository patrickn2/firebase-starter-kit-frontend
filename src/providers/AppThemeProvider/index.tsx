import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import AppLocale from 'shared/localization';
import { useLocaleContext } from '../AppContextProvider/LocaleContextProvide';
import { useThemeContext } from '../AppContextProvider/ThemeContextProvider';

const AppThemeProvider = ({ children }) => {
  const { theme } = useThemeContext();
  const { locale } = useLocaleContext();
  const { muiLocale } = AppLocale[locale.locale];

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(theme, muiLocale)}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AppThemeProvider;
