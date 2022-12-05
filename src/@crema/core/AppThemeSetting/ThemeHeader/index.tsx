import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
import {
  useLayoutActionsContext,
  useLayoutContext,
} from '../../../../providers/AppContextProvider/LayoutContextProvider';
import { HeaderType } from '../../../../shared/constants/AppEnums';
import { CustomizerItemWrapper } from '../index.style';

const ThemeHeader = () => {
  const { headerType } = useLayoutContext();
  const { setHeaderType } = useLayoutActionsContext();

  return (
    <CustomizerItemWrapper>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Box component='h4'>Header</Box>
      </Box>
      <FormControl
        variant='outlined'
        sx={{
          width: '100%',
        }}
      >
        <InputLabel id='select-header'>Header Type</InputLabel>
        <Select
          sx={{
            '& .MuiOutlinedInput-input': {
              padding: '12px 32px 12px 14px',
            },
          }}
          labelId='select-header'
          label='Header Type'
          value={headerType}
          // labelWidth={100}
          onChange={(e) => setHeaderType(e.target.value)}
        >
          <MenuItem value={HeaderType.FLUID}>Fluid</MenuItem>
          <MenuItem value={HeaderType.FIXED}>Fixed</MenuItem>
        </Select>
      </FormControl>
    </CustomizerItemWrapper>
  );
};

export default ThemeHeader;
