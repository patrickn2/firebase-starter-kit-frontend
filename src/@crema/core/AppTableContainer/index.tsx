import { Theme } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import { SxProps } from '@mui/system';
import React, { ReactNode } from 'react';

interface AppTableContainerProps {
  children: ReactNode;
  sxStyle?: SxProps<Theme>;
}

const AppTableContainer: React.FC<AppTableContainerProps> = ({
  children,
  sxStyle,
}) => {
  return (
    <TableContainer
      sx={{
        '& tr > th, & tr > td': {
          whiteSpace: 'nowrap',
        },
        ...sxStyle,
      }}
    >
      {children}
    </TableContainer>
  );
};

export default AppTableContainer;
