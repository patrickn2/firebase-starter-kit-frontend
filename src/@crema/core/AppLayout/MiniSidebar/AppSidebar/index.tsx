import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import clsx from 'clsx';
import { useSettings } from 'hooks/useSettings';
import React from 'react';
import { useLayoutContext } from '../../../../../providers/AppContextProvider/LayoutContextProvider';
import { useSidebarContext } from '../../../../../providers/AppContextProvider/SidebarContextProvider';
import AppScrollbar from '../../../AppScrollbar';
import MainSidebar from '../../components/MainSidebar';
import UserInfo from '../../components/UserInfo';
import VerticalNav from '../../components/VerticalNav';
import SidebarWrapper from './SidebarWrapper';

interface AppSidebarProps {
  position?: 'left' | 'top' | 'right' | 'bottom';
  variant?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  variant = '',
  position = 'left',
}) => {
  const { settings, toggleNavCollapsed } = useSettings();

  const { footer, footerType } = useLayoutContext();

  const { sidebarTextColor } = useSidebarContext();

  return (
    <>
      <Hidden xlUp>
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
          <SidebarWrapper className='mini-sidebar'>
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
          </SidebarWrapper>
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <SidebarWrapper className='mini-sidebar'>
          <MainSidebar>
            <UserInfo color={sidebarTextColor} />
            <AppScrollbar
              className={clsx({
                'has-footer-fixed': footer && footerType === 'fixed',
              })}
              sx={{
                py: 2,
                height: 'calc(100vh - 70px) !important',
                '&.has-footer-fixed': {
                  height: 'calc(100vh - 117px) !important',
                },
              }}
              scrollToTop={false}
            >
              <VerticalNav />
            </AppScrollbar>
          </MainSidebar>
        </SidebarWrapper>
      </Hidden>
    </>
  );
};
export default AppSidebar;
