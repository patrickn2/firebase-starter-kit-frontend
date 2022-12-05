import Box from '@mui/material/Box';
import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';
import { useLayoutContext } from '../../../../providers/AppContextProvider/LayoutContextProvider';
import { LayoutType } from '../../../../shared/constants/AppEnums';
import { AppContentView } from '../../../index';
import AppThemeSetting from '../../AppThemeSetting';
import AppFixedFooter from './AppFixedFooter';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import MiniSidebarToggleContainer from './MiniSidebarToggleContainer';
import MiniSidebarToggleWrapper from './MiniSidebarToggleWrapper';

interface MiniSidebarToggleProps {
  children: ReactNode;
}

const MiniSidebarToggle: React.FC<MiniSidebarToggleProps> = ({ children }) => {
  const [isCollapsed, setCollapsed] = useState(false);
  const { footer, layoutType, headerType, footerType } = useLayoutContext();

  return (
    <MiniSidebarToggleContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <MiniSidebarToggleWrapper
        className={clsx('miniSidebarToggleWrapper', {
          'mini-sidebar-collapsed': isCollapsed,
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
          appMainFixedHeader: headerType === 'fixed',
        })}
      >
        <AppSidebar />
        <Box className='mainContent'>
          <AppHeader setCollapsed={setCollapsed} isCollapsed={isCollapsed} />
          <AppContentView>{children}</AppContentView>
          <AppFixedFooter />
        </Box>
        <AppThemeSetting />
      </MiniSidebarToggleWrapper>
    </MiniSidebarToggleContainer>
  );
};

export default MiniSidebarToggle;
