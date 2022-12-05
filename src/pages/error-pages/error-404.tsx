import { AppLoader } from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';

const Error404 = dynamic(() => import('../../modules/errorPages/Error404'), {
  loading: () => <AppLoader />,
});
export default AppPage(() => <Error404 />);
