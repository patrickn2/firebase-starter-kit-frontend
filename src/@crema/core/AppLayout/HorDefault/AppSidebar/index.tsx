import Drawer from '@mui/material/Drawer';
import clsx from 'clsx';
import { useSettings } from 'hooks/useSettings';
import React from 'react';
import { useSidebarContext } from '../../../../../providers/AppContextProvider/SidebarContextProvider';
import AppScrollbar from '../../../AppScrollbar';
import MainSidebar from '../../components/MainSidebar';
import UserInfo from '../../components/UserInfo';
import VerticalNav from '../../components/VerticalNav';
import StandardSidebarWrapper from './StandardSidebarWrapper';
interface AppSidebarProps {
  position?: 'left' | 'top' | 'right' | 'bottom';
  variant?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  variant = '',
  position = 'left',
}) => {
  const { settings, toggleNavCollapsed } = useSettings();

  const { sidebarTextColor } = useSidebarContext();

  return (
    <>
      <Drawer
        anchor={position}
        open={settings.navCollapsed}
        onClose={() => toggleNavCollapsed()}
        classes={{
          root: clsx(variant),
          paper: clsx(variant),
        }}
        style={{ position: 'absolute' }}
      >
        <StandardSidebarWrapper className='standard-sidebar'>
          <MainSidebar>
            <UserInfo color={sidebarTextColor} />
            <AppScrollbar
              sx={{
                py: 2,
                height: 'calc(100vh - 70px) !important',
              }}
              scrollToTop={false}
            >
              <VerticalNav />
            </AppScrollbar>
          </MainSidebar>
        </StandardSidebarWrapper>
      </Drawer>
    </>
  );
};
export default AppSidebar;
