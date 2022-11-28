import {AppLoader} from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';

const Error503 = dynamic(() => import('../../modules/errorPages/Error503'), {
  loading: () => <AppLoader />,
});
export default AppPage(() => <Error503 />);
