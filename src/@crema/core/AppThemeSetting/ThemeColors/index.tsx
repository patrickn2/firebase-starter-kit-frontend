import { PaletteMode, SimplePaletteColorOptions } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import {
  useThemeActionsContext,
  useThemeContext,
} from '../../../../providers/AppContextProvider/ThemeContextProvider';
import themeColorSets from '../../../../shared/constants/ColorSets';
import IntlMessages from '../../../utility/IntlMessages';
import AppGrid from '../../AppGrid';
import CustomColorCell from '../CustomColorCell';
import { CustomizerItemWrapper } from '../index.style';

export interface ThemeColorsProps {
  mode: PaletteMode;
  primary: {
    main: string;
  };
  secondary: {
    main: string;
  };
  background: {
    paper: string;
    default: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  title: string;
}

const ThemeColors = () => {
  const { theme } = useThemeContext();

  const { updateTheme } = useThemeActionsContext();

  const updateThemeColors = (colorSet: ThemeColorsProps) => {
    (theme.palette?.primary as SimplePaletteColorOptions).main =
      colorSet.primary.main;
    (theme.palette?.secondary as SimplePaletteColorOptions).main =
      colorSet.secondary.main;
    if (theme.palette) {
      theme.palette.background = colorSet.background;
      theme.palette.mode = colorSet.mode;
      theme.palette.text = colorSet.text;
    }
    updateTheme({ ...theme });
  };
  return (
    <CustomizerItemWrapper>
      <Box component='h4' sx={{ mb: 2 }}>
        <IntlMessages id='customizer.themeColors' />
      </Box>
      <Box mt={4}>
        <AppGrid
          data={themeColorSets}
          itemPadding={5}
          responsive={{
            xs: 1,
            sm: 2,
          }}
          renderRow={(colorSet, index) => (
            <CustomColorCell
              key={index}
              updateThemeColors={updateThemeColors}
              themeColorSet={colorSet}
            />
          )}
        />
      </Box>
    </CustomizerItemWrapper>
  );
};

export default ThemeColors;
