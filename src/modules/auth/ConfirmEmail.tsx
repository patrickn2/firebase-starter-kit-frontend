import { useAuthMethod } from '@crema/utility/AuthHooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AppLogo from '../../@crema/core/AppLayout/components/AppLogo';
import IntlMessages from '../../@crema/utility/IntlMessages';
import { Fonts } from '../../shared/constants/AppEnums';
import AuthWrapper from './AuthWrapper';

const ConfirmEmail = () => {
  const { confirmEmail } = useAuthMethod();

  const router = useRouter();

  useEffect(() => {
    const code = router.query.oobCode as string;
    confirmEmail(code);
  }, []);

  const handleSubmit = () => {
    router.push(process.env.NEXT_PUBLIC_LOGIN as string);
  };

  return (
    <AuthWrapper>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AppLogo />
        </Box>
        <Typography
          variant='h2'
          component='h2'
          sx={{
            mb: 1.5,
            color: (theme) => theme.palette.text.primary,
            fontWeight: Fonts.SEMI_BOLD,
            fontSize: { xs: 14, xl: 16 },
          }}
        >
          <IntlMessages id='common.emailVerification' />
        </Typography>
        <Box
          sx={{
            mb: { xs: 5, xl: 10 },
            fontSize: 18,
          }}
        >
          <Typography>
            Email confirmed. Click Login to go to the Login page.
          </Typography>
        </Box>

        <Button
          variant='contained'
          color='primary'
          type='submit'
          sx={{
            fontWeight: Fonts.REGULAR,
            textTransform: 'capitalize',
            fontSize: 16,
            minWidth: 160,
          }}
          onClick={handleSubmit}
        >
          <IntlMessages id='common.login' />
        </Button>
      </Box>
    </AuthWrapper>
  );
};

export default ConfirmEmail;
