import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)<BoxProps>(() => ({
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '10px',
}));
