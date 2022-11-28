import { AppLoader } from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';

const CurrentPage = dynamic(
  () => import('../../../page_templates/admin/roles'),
  {
    loading: () => <AppLoader />,
  },
);
export default AppPage(() => <CurrentPage />);
