import { AppLoader } from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import AppPage from '../@crema/hoc/DefaultPage/index';

const ResetPassword = dynamic(() => import('../modules/auth/ResetPassword'), {
  loading: () => <AppLoader />,
});
export default AppPage(() => <ResetPassword />);
