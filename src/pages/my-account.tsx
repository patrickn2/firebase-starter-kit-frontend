import { AppLoader } from '@crema';
import AppPage from '@crema/hoc/AppPage';
import dynamic from 'next/dynamic';
import React from 'react';

const Account = dynamic(() => import('modules/extraPages/Account'), {
  loading: () => <AppLoader />,
});
export default AppPage(() => <Account />);
