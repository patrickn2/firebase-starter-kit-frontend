import { AppLoader } from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import AppPage from '../@crema/hoc/DefaultPage/index';

const SignUP = dynamic(() => import('../modules/auth/Signup/index'), {
  loading: () => <AppLoader />,
});
export default AppPage(() => <SignUP />);
