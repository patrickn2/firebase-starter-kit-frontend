import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import AlertsDialogs from 'components/alertsNDialogs';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import '../../public/assets/styles/index.css';
import AuthRoutes from '../@crema/utility/AuthRoutes';
import createEmotionCache from '../createEmotionCache';
import AppContextProvider from '../providers/AppContextProvider';
import AppLocaleProvider from '../providers/AppLocaleProvider';
import AppStyleProvider from '../providers/AppStyleProvider';
import AppThemeProvider from '../providers/AppThemeProvider';
import FirebaseAuthProvider from '../providers/FirebaseAuthProvider';
import '../shared/vendors/index.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Crema material</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <AppContextProvider>
        <Provider store={store}>
          <AppThemeProvider>
            <AppStyleProvider>
              <AppLocaleProvider>
                <FirebaseAuthProvider>
                  <AuthRoutes>
                    <CssBaseline />
                    <Component {...pageProps} />
                    <AlertsDialogs />
                  </AuthRoutes>
                </FirebaseAuthProvider>
              </AppLocaleProvider>
            </AppStyleProvider>
          </AppThemeProvider>
        </Provider>
      </AppContextProvider>
    </CacheProvider>
  );
}
