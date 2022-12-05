import { AppLoader } from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import AppPage from '../@crema/hoc/DefaultPage/index';

const ForgetPassword = dynamic(
  () => import('../modules/auth/ForgetPassword/index'),
  {
    loading: () => <AppLoader />,
  },
);
export default AppPage(() => <ForgetPassword />);
