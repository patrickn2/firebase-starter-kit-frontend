import {AppLoader} from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';

const Error401 = dynamic(() => import('../../modules/errorPages/Error401'), {
  loading: () => <AppLoader />,
});
export default AppPage(() => <Error401 />);
