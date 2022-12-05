import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import React, { CSSProperties, ReactNode } from 'react';
import ListFooter from './ListFooter';
import ListView from './ListView';

interface AppListProps {
  border?: boolean;
  delay?: number;
  animation?: any;
  sx?: SxProps<Theme>;
  containerStyle?: CSSProperties;
  ListEmptyComponent?: ReactNode;
  ListFooterComponent?: ReactNode;
  data: any[];
  onEndReached?: () => void;
  renderRow: (item: any, index: number) => ReactNode;
  footerProps?: {
    loading: boolean;
    footerText: string;
  };

  [x: string]: any;
}

const AppList: React.FC<AppListProps> = ({ footerProps, ...props }) => {
  return (
    <ListView
      {...props}
      ListFooterComponent={
        footerProps ? (
          <ListFooter
            loading={footerProps.loading}
            footerText={footerProps.footerText}
          />
        ) : null
      }
    />
  );
};

export default AppList;
