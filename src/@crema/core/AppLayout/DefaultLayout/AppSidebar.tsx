import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import clsx from 'clsx';
import React from 'react';
import { useSettings } from '../../../../hooks/useSettings';
import { useLayoutContext } from '../../../../providers/AppContextProvider/LayoutContextProvider';
import { useSidebarContext } from '../../../../providers/AppContextProvider/SidebarContextProvider';
import AppScrollbar from '../../AppScrollbar';
import MainSidebar from '../components/MainSidebar';
import UserInfo from '../components/UserInfo';
import VerticalNav from '../components/VerticalNav';

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
      <Hidden lgUp>
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
          <MainSidebar>
            <UserInfo color={sidebarTextColor} />
            <AppScrollbar
              sx={{
                py: 2,
                height: 'calc(100vh - 70px) !important',
                borderTop: (theme: { palette: { divider: string } }) =>
                  `solid 1px ${theme.palette.divider}`,
                mt: 0.5,
              }}
            >
              <VerticalNav />
            </AppScrollbar>
          </MainSidebar>
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <MainSidebar>
          <UserInfo color={sidebarTextColor} />
          <AppScrollbar
            className={clsx({
              'has-footer-fixed': footer && footerType === 'fixed',
            })}
            sx={{
              py: 2,
              height: 'calc(100vh - 70px) !important',
              borderTop: (theme: { palette: { divider: string } }) =>
                `solid 1px ${theme.palette.divider}`,
              mt: 0.5,
              '&.has-footer-fixed': {
                height: {
                  xs: 'calc(100vh - 117px) !important',
                  xl: 'calc(100vh - 127px) !important',
                },
              },
            }}
          >
            <VerticalNav />
          </AppScrollbar>
        </MainSidebar>
      </Hidden>
    </>
  );
};

export default AppSidebar;
