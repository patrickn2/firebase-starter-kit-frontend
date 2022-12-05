import { mainTheme } from 'providers/AppContextProvider/defaultConfig';
import { useThemeActionsContext } from 'providers/AppContextProvider/ThemeContextProvider';
import { useEffect } from 'react';
import FooterPage from './footer';
import HeaderPage from './header';
const main = ({ children }) => {
  const { updateTheme } = useThemeActionsContext();

  useEffect(() => {
    updateTheme(mainTheme);
  });

  return (
    <>
      <HeaderPage />
      {children}
      <FooterPage />
    </>
  );
};

export default main;
