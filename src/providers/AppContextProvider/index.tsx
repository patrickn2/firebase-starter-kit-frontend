import React, { ReactNode } from 'react';
import LayoutContextProvider from './LayoutContextProvider';
import LocaleContextProvider from './LocaleContextProvide';
import SidebarContextProvider from './SidebarContextProvider';
import ThemeContextProvider from './ThemeContextProvider';

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  return (
    <ThemeContextProvider>
      <LocaleContextProvider>
        <LayoutContextProvider>
          <SidebarContextProvider>{children}</SidebarContextProvider>
        </LayoutContextProvider>
      </LocaleContextProvider>
    </ThemeContextProvider>
  );
};

export default AppContextProvider;
