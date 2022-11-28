import {AppLoader} from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';

const Maintenance = dynamic(
  () => import('../../modules/errorPages/Maintenance'),
  {
    loading: () => <AppLoader />,
  },
);
export default AppPage(() => <Maintenance />);
