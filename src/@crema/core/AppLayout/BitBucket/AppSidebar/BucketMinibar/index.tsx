import SearchIcon from '@mui/icons-material/Search';
import { SimplePaletteColorOptions } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import Logo from '../../../../../../assets/icon/logo.svg';
import { useThemeContext } from '../../../../../../providers/AppContextProvider/ThemeContextProvider';
import AppLngSwitcher from '../../../../AppLngSwitcher';
import AppMessages from '../../../../AppMessages';
import AppNotifications from '../../../../AppNotifications';
import UserInfo from '../UserInfo';
import BucketMinibarWrapper from './BucketMinibarWrapper';

const BucketMinibar = () => {
  const { theme } = useThemeContext();

  return (
    <BucketMinibarWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 1.5,
        }}
      >
        <IconButton
          sx={{
            flexDirection: 'column',
            color: 'white',
            mb: 2.5,
          }}
          aria-label='show 17 new notifications'
        >
          <Logo
            fill={(theme.palette?.primary as SimplePaletteColorOptions).main}
          />
        </IconButton>

        <IconButton
          className='search-icon-btn'
          aria-label='show 17 new notifications'
        >
          <SearchIcon />
        </IconButton>
        <AppLngSwitcher iconOnly={true} tooltipPosition='right' />

        <AppNotifications
          drawerPosition='left'
          tooltipPosition='right'
          sxNotificationContentStyle={{ width: 320 }}
        />
        <AppMessages
          drawerPosition='left'
          tooltipPosition='right'
          sxMessageContentStyle={{ width: 320 }}
        />
      </Box>
      <Box
        sx={{
          mt: 'auto',
        }}
      >
        <UserInfo />
      </Box>
    </BucketMinibarWrapper>
  );
};

export default BucketMinibar;
