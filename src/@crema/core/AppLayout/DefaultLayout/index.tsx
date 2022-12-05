import AppContentView from '@crema/core/AppContentView';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { useLayoutContext } from '../../../../providers/AppContextProvider/LayoutContextProvider';
import { LayoutType } from '../../../../shared/constants/AppEnums';
import AppThemeSetting from '../../AppThemeSetting';
import AppFixedFooter from './AppFixedFooter';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import DefaultLayoutContainer from './DefaultLayoutContainer';
import DefaultLayoutWrapper from './DefaultLayoutWrapper';
import MainContent from './MainContent';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { footer, layoutType, headerType, footerType } = useLayoutContext();

  return (
    <DefaultLayoutContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <DefaultLayoutWrapper
        className={clsx('defaultLayoutWrapper', {
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
      </DefaultLayoutWrapper>
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
