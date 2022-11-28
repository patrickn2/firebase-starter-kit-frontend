import {AppLoader} from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import AppPage from '../@crema/hoc/DefaultPage/index';

const SignIn = dynamic(() => import('../modules/auth/Signin/index'), {
  loading: () => <AppLoader />,
});
export default AppPage(() => <SignIn />);
