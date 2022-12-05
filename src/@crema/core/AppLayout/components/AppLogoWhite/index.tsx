import { Box } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import Image from 'next/image';
import React from 'react';

const AppLogoWhite = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'center',
      }}
    >
      <Hidden smUp>
        <Image
          style={{
            height: 30,
            marginRight: 10,
          }}
          src={'/assets/images/logo-white.png'}
          alt='crema-logo'
        />
      </Hidden>
      <Hidden smDown>
        <Image
          style={{
            height: 30,
            marginRight: 10,
          }}
          src={'/assets/images/logo-white-with-name.png'}
          alt='crema-logo'
        />
      </Hidden>
    </Box>
  );
};

export default AppLogoWhite;
