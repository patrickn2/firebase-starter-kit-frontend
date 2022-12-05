import { Box } from '@mui/material';
import { alpha, SimplePaletteColorOptions } from '@mui/material/styles';
import Logo from 'assets/icon/logo.svg';
import LogoText from 'assets/icon/logo_text.svg';
import React from 'react';
import { useThemeContext } from '../../../../../providers/AppContextProvider/ThemeContextProvider';

interface AppLogoProps {
  color?: string;
}

const AppLogo: React.FC<AppLogoProps> = () => {
  const { theme } = useThemeContext();

  return (
    <Box
      sx={{
        height: { xs: 56, sm: 70 },
        padding: 2.5,
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
          height: { xs: 40, sm: 45 },
        },
      }}
      className='app-logo'
    >
      <Logo fill={(theme.palette?.primary as SimplePaletteColorOptions).main} />
      <Box
        sx={{
          mt: 1,
          display: { xs: 'none', md: 'block' },
          '& svg': {
            height: { xs: 25, sm: 30 },
          },
        }}
      >
        <LogoText fill={alpha(theme.palette?.text?.primary as string, 0.8)} />
      </Box>
    </Box>
  );
};

export default AppLogo;
