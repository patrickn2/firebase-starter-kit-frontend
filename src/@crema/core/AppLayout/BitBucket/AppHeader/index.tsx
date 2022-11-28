import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import {useSettings} from 'hooks/useSettings';
import React from 'react';
import SearchBar from '../../../AppSearchBar';
import AppLogo from '../../components/AppLogo';
import BitBucketHeaderWrapper from './BitBucketHeaderWrapper';

const AppHeader = () => {
  const {toggleNavCollapsed} = useSettings();

  return (
    <Hidden lgUp>
      <BitBucketHeaderWrapper className='bit-bucket-header'>
        <IconButton
          edge='start'
          className='menu-btn'
          color='inherit'
          aria-label='open drawer'
          onClick={() => toggleNavCollapsed()}
        >
          <MenuIcon className='menu-icon' />
        </IconButton>
        <AppLogo />
        <Box
          sx={{
            ml: 'auto',
          }}
        >
          <SearchBar borderLight placeholder='Search…' />
        </Box>
      </BitBucketHeaderWrapper>
    </Hidden>
  );
};
export default AppHeader;
