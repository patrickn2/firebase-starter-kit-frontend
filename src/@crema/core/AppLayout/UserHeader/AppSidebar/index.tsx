import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import clsx from 'clsx';
import { useSettings } from 'hooks/useSettings';
import React from 'react';
import { useLayoutContext } from '../../../../../providers/AppContextProvider/LayoutContextProvider';
import AppScrollbar from '../../../AppScrollbar';
import MainSidebar from '../../components/MainSidebar';
import VerticalNav from '../../components/VerticalNav';
import UserHeaderSidebarWrapper from './UserHeaderSidebarWrapper';
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
          <UserHeaderSidebarWrapper className='user-header-sidebar'>
            <MainSidebar>
              <AppScrollbar
                sx={{
                  py: 2,
                }}
                scrollToTop={false}
              >
                <VerticalNav />
              </AppScrollbar>
            </MainSidebar>
          </UserHeaderSidebarWrapper>
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <UserHeaderSidebarWrapper className='user-header-sidebar'>
          <MainSidebar>
            <AppScrollbar
              className={clsx({
                'has-footer-fixed': footer && footerType === 'fixed',
              })}
              sx={{
                py: 2,
                height: 'calc(100vh - 71px) !important',
                '&.has-footer-fixed': {
                  height: {
                    xs: 'calc(100vh - 119px) !important',
                    xl: 'calc(100vh - 131px) !important',
                  },
                },
              }}
              scrollToTop={false}
            >
              <VerticalNav />
            </AppScrollbar>
          </MainSidebar>
        </UserHeaderSidebarWrapper>
      </Hidden>
    </>
  );
};
export default AppSidebar;
