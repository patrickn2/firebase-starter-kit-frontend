import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React, { ReactElement } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { LayoutDirection } from '../../shared/constants/AppEnums';
import { useThemeContext } from '../AppContextProvider/ThemeContextProvider';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

interface AppStyleProviderProps {
  children: ReactElement;
}

const AppStyleProvider: React.FC<AppStyleProviderProps> = (props) => {
  const { theme } = useThemeContext();
  if (theme.direction === LayoutDirection.LTR) return props.children;
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
};
export default AppStyleProvider;
