import { AppLoader } from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';

const Error403 = dynamic(() => import('../../modules/errorPages/Error403'), {
  loading: () => <AppLoader />,
});
export default AppPage(() => <Error403 />);
