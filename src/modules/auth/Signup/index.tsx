import Box from '@mui/material/Box';
import React from 'react';
import AppLogo from '../../../@crema/core/AppLayout/components/AppLogo';
import AuthWrapper from '../AuthWrapper';
import SignupFirebase from './SignupFirebase';

const Signup = () => {
  return (
    <AuthWrapper>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ mb: { xs: 6, xl: 8 } }}>
          <Box
            sx={{
              mb: 5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AppLogo />
          </Box>
        </Box>
        <SignupFirebase />
      </Box>
    </AuthWrapper>
  );
};

export default Signup;
