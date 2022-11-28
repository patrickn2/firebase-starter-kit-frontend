import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import clsx from 'clsx';
import {useSettings} from 'hooks/useSettings';
import React from 'react';
import {Fonts} from '../../../../../shared/constants/AppEnums';
import AppScrollbar from '../../../AppScrollbar';
import MainSidebar from '../../components/MainSidebar';
import VerticalNav from '../../components/VerticalNav';
import AppSidebarContainer from './AppSidebarContainer';
import BitBucketSidebarWrapper from './BitBucketSidebarWrapper';
import BucketMinibar from './BucketMinibar';

interface AppSidebarProps {
  position?: 'left' | 'top' | 'right' | 'bottom';
  variant?: string;
  isCollapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = (props) => {
  const {settings, toggleNavCollapsed} = useSettings();
  const {isCollapsed, setCollapsed, variant = '', position = 'left'} = props;

  const sideBarComponent = () => {
    return (
      <BitBucketSidebarWrapper className='bit-bucket-sidebar'>
        <Box className='bit-bucket-sidebar-fixed'>
          <Box
            className='bit-bucket-btn'
            onClick={() => setCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
          </Box>
          <BucketMinibar />
          <AppSidebarContainer className='app-sidebar-container'>
            <MainSidebar>
              <Box
                sx={{
                  py: 4.5,
                  px: 7.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: Fonts.MEDIUM,
                  }}
                  component='h2'
                >
                  Crema
                </Typography>
              </Box>
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
          </AppSidebarContainer>
        </Box>
      </BitBucketSidebarWrapper>
    );
  };
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
          {sideBarComponent()}
        </Drawer>
      </Hidden>
      <Hidden lgDown>{sideBarComponent()}</Hidden>
    </>
  );
};
export default AppSidebar;
