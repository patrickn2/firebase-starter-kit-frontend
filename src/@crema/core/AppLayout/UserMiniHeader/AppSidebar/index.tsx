import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import clsx from 'clsx';
import {useSettings} from 'hooks/useSettings';
import React from 'react';
import {useLayoutContext} from '../../../../utility/AppContextProvider/LayoutContextProvider';
import AppScrollbar from '../../../AppScrollbar';
import MainSidebar from '../../components/MainSidebar';
import VerticalNav from '../../components/VerticalNav';
import UserMiniHeaderSidebarWrapper from './UserMiniHeaderSidebarWrapper';

interface AppSidebarProps {
  position?: 'left' | 'top' | 'right' | 'bottom';
  variant?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  variant = '',
  position = 'left',
}) => {
  const {settings, toggleNavCollapsed} = useSettings();

  const {footer, footerType} = useLayoutContext();

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
          style={{position: 'absolute'}}
        >
          <UserMiniHeaderSidebarWrapper className='user-mini-header-sidebar'>
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
          </UserMiniHeaderSidebarWrapper>
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <UserMiniHeaderSidebarWrapper className='user-mini-header-sidebar'>
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
        </UserMiniHeaderSidebarWrapper>
      </Hidden>
    </>
  );
};
export default AppSidebar;
