import SearchIcon from '@mui/icons-material/Search';
import { Theme } from '@mui/material';
import { SxProps } from '@mui/system/styleFunctionSx';
import clsx from 'clsx';
import React from 'react';
import {
  SearchIconBox,
  SearchIconWrapper,
  SearchInputBase,
  SearchWrapper,
} from './index.style';

interface AppSearchProps {
  iconPosition?: string;
  align?: string;
  placeholder?: string;
  overlap?: boolean;
  borderLight?: boolean;
  className?: string;
  onlyIcon?: boolean;
  disableFocus?: boolean;
  iconStyle?: SxProps<Theme>;
  sx?: SxProps<Theme>;

  [x: string]: any;
}

const AppSearch: React.FC<AppSearchProps> = ({
  placeholder,
  iconPosition = 'left',
  align = 'left',
  overlap = true,
  onlyIcon = false,
  disableFocus,
  iconStyle = {
    color: 'grey',
  },
  sx,
  ...rest
}) => {
  return (
    <SearchWrapper sx={sx} position={iconPosition}>
      <SearchIconBox
        align={align}
        className={clsx(
          'searchRoot',
          { 'hs-search': overlap },
          { 'hs-disableFocus': disableFocus },
          { searchIconBox: onlyIcon },
        )}
      >
        <SearchIconWrapper
          className={clsx({
            right: iconPosition === 'right',
          })}
          sx={iconStyle}
        >
          <SearchIcon />
        </SearchIconWrapper>
        <SearchInputBase
          {...rest}
          placeholder={placeholder || 'Search…'}
          inputProps={{ 'aria-label': 'search' }}
        />
      </SearchIconBox>
    </SearchWrapper>
  );
};

export default AppSearch;
