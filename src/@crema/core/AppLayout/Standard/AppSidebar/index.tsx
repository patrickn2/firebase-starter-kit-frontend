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
      </Hidden>
      <Hidden lgDown>
        <StandardSidebarWrapper className='standard-sidebar'>
          <MainSidebar>
            <UserInfo color={sidebarTextColor} />
            <AppScrollbar
              className={clsx({
                'has-footer-fixed': footer && footerType === 'fixed',
              })}
              sx={{
                py: 2,
                height: 'calc(100vh - 141px) !important',
                '&.has-footer-fixed': {
                  height: 'calc(100vh - 188px) !important',
                },
              }}
              scrollToTop={false}
            >
              <VerticalNav />
            </AppScrollbar>
          </MainSidebar>
        </StandardSidebarWrapper>
      </Hidden>
    </>
  );
};
export default AppSidebar;
