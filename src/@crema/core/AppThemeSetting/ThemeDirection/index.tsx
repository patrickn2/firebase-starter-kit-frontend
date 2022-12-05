import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import React from 'react';
import {
  useThemeActionsContext,
  useThemeContext,
} from '../../../../providers/AppContextProvider/ThemeContextProvider';
import { LayoutDirection } from '../../../../shared/constants/AppEnums';
import IntlMessages from '../../../utility/IntlMessages';
import { CustomizerItemWrapper } from '../index.style';

const ThemeDirection = () => {
  const { theme } = useThemeContext();
  const { updateTheme } = useThemeActionsContext();

  const onChangeRtlSetting = (event: React.ChangeEvent<HTMLInputElement>) => {
    theme.direction = event.target.checked
      ? LayoutDirection.RTL
      : LayoutDirection.LTR;
    updateTheme({ ...theme });
  };

  return (
    <CustomizerItemWrapper>
      <Box display='flex' alignItems='center'>
        <Box component='h4'>
          <IntlMessages id='customizer.rtlSupport' />
        </Box>
        <Box component='span' ml='auto'>
          <Switch
            checked={theme.direction === LayoutDirection.RTL}
            onChange={onChangeRtlSetting}
            value='checkedA'
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </Box>
      </Box>
    </CustomizerItemWrapper>
  );
};

export default ThemeDirection;
