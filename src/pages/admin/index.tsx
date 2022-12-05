import { AppLoader } from '@crema';
import dynamic from 'next/dynamic';
import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';

const AdminDashboard = dynamic(
  () => import('../../page_templates/admin/dashboard'),
  {
    loading: () => <AppLoader />,
  },
);
export default AppPage(() => <AdminDashboard />);
