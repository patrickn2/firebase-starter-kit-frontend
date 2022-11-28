import MenuIcon from '@mui/icons-material/Menu';
import { Box, Slide, Theme, Zoom } from '@mui/material';
import Card from '@mui/material/Card';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/system';
import { useCommon } from 'hooks/useCommon';
import React, { CSSProperties, ReactNode } from 'react';
import { Fonts, NavStyle } from '../../../shared/constants/AppEnums';
import { useLayoutContext } from '../../utility/AppContextProvider/LayoutContextProvider';
import AppContainerWrapper from './AppContainerWrapper';
import AppSidebar from './AppSidebar';

interface AppsContainerProps {
  title: string | ReactNode;

  sidebarContent?: ReactNode;
  fullView?: boolean;
  children: ReactNode;
  sxStyle?: SxProps<Theme>;
  cardStyle?: CSSProperties;
}

const AppsContainer: React.FC<AppsContainerProps> = (props) => {
  const { common, onToggleAppDrawer } = useCommon();

  const { footer } = useLayoutContext();
  const { navStyle } = useLayoutContext();
  const { title, sidebarContent, fullView, children } = props;

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        margin: -4,
        padding: 4,
        ...props.sxStyle,
      }}
    >
      <Box
        sx={{
          marginTop: fullView ? 0 : -4,
          display: 'flex',
          alignItems: 'center',
          mb: {
            xs: fullView ? 4 : 2,
            lg: 4,
          },
          mt: {
            xs: fullView ? 0 : -4,
            lg: 0,
          },
        }}
      >
        {fullView ? null : (
          <Hidden lgUp>
            <IconButton
              edge='start'
              sx={{
                marginRight: (theme) => theme.spacing(2),
              }}
              color='inherit'
              aria-label='open drawer'
              onClick={() => onToggleAppDrawer()}
              size='large'
            >
              <MenuIcon
                sx={{
                  width: 35,
                  height: 35,
                }}
              />
            </IconButton>
          </Hidden>
        )}
        <Zoom in style={{ transitionDelay: '300ms' }}>
          <Box
            component='h2'
            sx={{
              fontSize: 16,
              color: 'text.primary',
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            {title}
          </Box>
        </Zoom>
      </Box>

      <AppContainerWrapper navStyle={navStyle as NavStyle} footer={footer}>
        {sidebarContent ? (
          <AppSidebar
            isAppDrawerOpen={common.isAppDrawerOpen}
            footer={footer}
            fullView={fullView}
            sidebarContent={sidebarContent}
          />
        ) : null}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '100%',
              lg: `calc(100% - ${fullView ? 0 : 280}px)`,
            },
            pl: {
              lg: props.fullView ? 0 : 8,
            },
          }}
        >
          <Slide direction='left' in mountOnEnter unmountOnExit>
            <Card
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                ...props.cardStyle,
              }}
            >
              {children}
            </Card>
          </Slide>
        </Box>
      </AppContainerWrapper>
    </Box>
  );
};

export default AppsContainer;
