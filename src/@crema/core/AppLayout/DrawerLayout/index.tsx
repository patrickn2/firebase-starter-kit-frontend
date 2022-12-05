import AppContentView from '@crema/core/AppContentView';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { useLayoutContext } from '../../../../providers/AppContextProvider/LayoutContextProvider';
import { LayoutType } from '../../../../shared/constants/AppEnums';
import AppThemeSetting from '../../AppThemeSetting';
import AppFixedFooter from './AppFixedFooter';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import DrawerLayoutContainer from './DrawerLayoutContainer';
import DrawerLayoutWrapper from './DrawerLayoutWrapper';
import MainContent from './MainContent';

interface DrawerLayoutProps {
  children: ReactNode;
}

const DrawerLayout: React.FC<DrawerLayoutProps> = ({ children }) => {
  const { footer, layoutType, headerType, footerType } = useLayoutContext();

  return (
    <DrawerLayoutContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <DrawerLayoutWrapper
        className={clsx('drawerLayoutWrapper', {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
          appMainFixedHeader: headerType === 'fixed',
        })}
      >
        <AppSidebar />

        <MainContent>
          <AppHeader />
          <AppContentView>{children}</AppContentView>
          <AppFixedFooter />
        </MainContent>
        <AppThemeSetting />
      </DrawerLayoutWrapper>
    </DrawerLayoutContainer>
  );
};

export default DrawerLayout;
