import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface AppContentViewWrapperProps {
  children: ReactNode;
}

const AppContentViewWrapper: React.FC<AppContentViewWrapperProps> = ({
  children,
  ...rest
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        maxWidth: { xl: 1650 },
        mx: { xl: 'auto' },
        width: { xl: '100%' },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default AppContentViewWrapper;
