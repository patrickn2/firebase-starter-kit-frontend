import {AppLoader} from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';

const ComingSoon = dynamic(
  () => import('../../modules/errorPages/ComingSoon'),
  {
    loading: () => <AppLoader />,
  },
);
export default AppPage(() => <ComingSoon />);
