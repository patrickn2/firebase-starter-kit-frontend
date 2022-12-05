import styled from '@emotion/styled';
import { lighten, ThemeOptions } from '@mui/material';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useThemeContext } from 'providers/AppContextProvider/ThemeContextProvider';
import React from 'react';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }: { theme: ThemeOptions }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: lighten(theme.palette?.background?.default ?? '', 0.25),
    '&:before': {
      boxShadow: theme.shadows?.[1],
    },
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: lighten(theme.palette?.background?.default ?? '', 0.25),
    color: theme.palette?.text?.primary,
    boxShadow: theme.shadows?.[1],
    fontSize: 11,
  },
}));

interface AppTooltipProps {
  title: any;
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  children: React.ReactElement<any, any>;
}

const AppTooltip: React.FC<AppTooltipProps> = ({
  title,
  placement = 'top',
  children,
}) => {
  const { theme } = useThemeContext();
  return (
    <LightTooltip
      title={title}
      TransitionComponent={Zoom}
      placement={placement}
      arrow
      theme={theme}
    >
      {children}
    </LightTooltip>
  );
};
export default AppTooltip;
