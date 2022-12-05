import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useLayoutContext } from '../../../../../providers/AppContextProvider/LayoutContextProvider';
import FooterWrapper from './FooterWrapper';

const AppFixedFooter = () => {
  const { footer, footerType } = useLayoutContext();

  return (
    <>
      {footer && footerType === 'fixed' ? (
        <FooterWrapper className='footer fixed-footer'>
          <div className='footerContainer'>
            <Typography>Copy right @crema 2021</Typography>
            <Box sx={{ ml: 'auto' }}>
              <Button color='primary'>Buy Now</Button>
            </Box>
          </div>
        </FooterWrapper>
      ) : null}
    </>
  );
};

export default AppFixedFooter;
