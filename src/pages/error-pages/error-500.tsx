import { AppLoader } from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';

const Error500 = dynamic(() => import('../../modules/errorPages/Error500'), {
  loading: () => <AppLoader />,
});
export default AppPage(() => <Error500 />);
