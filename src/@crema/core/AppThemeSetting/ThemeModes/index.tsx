import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import clsx from 'clsx';
import React from 'react';
import {
  DarkSidebar,
  LightSidebar,
} from '../../../../providers/AppContextProvider/defaultConfig';
import { useSidebarActionsContext } from '../../../../providers/AppContextProvider/SidebarContextProvider';
import {
  useThemeActionsContext,
  useThemeContext,
} from '../../../../providers/AppContextProvider/ThemeContextProvider';
import { ThemeMode } from '../../../../shared/constants/AppEnums';
import IntlMessages from '../../../utility/IntlMessages';
import { CustomizerItemWrapper, StyledToggleButton } from '../index.style';

const ThemeModes = () => {
  const { updateThemeMode } = useThemeActionsContext();
  const { updateSidebarColorSet } = useSidebarActionsContext();
  const { themeMode } = useThemeContext();

  const onModeChange = (event: any, themeMode: string) => {
    if (themeMode) {
      updateThemeMode(themeMode);
      if (themeMode === ThemeMode.LIGHT) {
        updateSidebarColorSet({
          sidebarBgColor: LightSidebar.sidebarBgColor,
          sidebarTextColor: LightSidebar.sidebarTextColor,
          sidebarMenuSelectedBgColor: LightSidebar.sidebarMenuSelectedBgColor,
          sidebarMenuSelectedTextColor:
            LightSidebar.sidebarMenuSelectedTextColor,
          sidebarHeaderColor: LightSidebar.sidebarHeaderColor,
          mode: 'Light',
        });
      } else {
        updateSidebarColorSet({
          sidebarBgColor: DarkSidebar.sidebarBgColor,
          sidebarTextColor: DarkSidebar.sidebarTextColor,
          sidebarMenuSelectedBgColor: DarkSidebar.sidebarMenuSelectedBgColor,
          sidebarMenuSelectedTextColor:
            DarkSidebar.sidebarMenuSelectedTextColor,
          sidebarHeaderColor: DarkSidebar.sidebarHeaderColor,
          mode: 'Dark',
        });
      }
    }
  };

  return (
    <CustomizerItemWrapper>
      <Box component='h4' sx={{ mb: 2 }}>
        <IntlMessages id='customizer.themeMode' />
      </Box>
      <ToggleButtonGroup
        value={themeMode}
        exclusive
        onChange={onModeChange}
        aria-label='text alignment'
      >
        <StyledToggleButton
          value={ThemeMode.LIGHT}
          className={clsx({
            active: themeMode === ThemeMode.LIGHT,
          })}
          aria-label='left aligned'
        >
          <IntlMessages id='customizer.light' />
        </StyledToggleButton>

        <StyledToggleButton
          value={ThemeMode.DARK}
          className={clsx({
            active: themeMode === ThemeMode.DARK,
          })}
          aria-label='centered'
        >
          <IntlMessages id='customizer.dark' />
        </StyledToggleButton>
      </ToggleButtonGroup>
    </CustomizerItemWrapper>
  );
};

export default ThemeModes;
