import { AppLoader } from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import AppPage from '../../../@crema/hoc/AppPage';

const AdminUsers = dynamic(
  () => import('../../../page_templates/admin/users'),
  {
    loading: () => <AppLoader />,
  },
);
export default AppPage(() => <AdminUsers />);
