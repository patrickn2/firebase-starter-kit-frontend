import AppContentView from '@crema/core/AppContentView';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { useLayoutContext } from '../../../../providers/AppContextProvider/LayoutContextProvider';
import { LayoutType } from '../../../../shared/constants/AppEnums';
import AppThemeSetting from '../../AppThemeSetting';
import AppFixedFooter from './AppFixedFooter';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import HorDefaultContainer from './HorDefaultContainer';
import HorDefaultWrapper from './HorDefaultWrapper';
import MainContent from './MainContent';

interface HorDefaultProps {
  children: ReactNode;
}

const HorDefault: React.FC<HorDefaultProps> = ({ children }) => {
  const { footer, layoutType, footerType } = useLayoutContext();

  return (
    <HorDefaultContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <HorDefaultWrapper
        className={clsx('horDefaultWrapper', {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
        })}
      >
        <AppSidebar />

        <MainContent>
          <AppHeader />
          <AppContentView>{children}</AppContentView>
          <AppFixedFooter />
        </MainContent>
        <AppThemeSetting />
      </HorDefaultWrapper>
    </HorDefaultContainer>
  );
};

export default HorDefault;
