import { AppLoader } from '@crema';
import AppPage from '@crema/hoc/DefaultPage/index';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

const ConfirmEmail = dynamic(() => import('../modules/auth/ConfirmEmail'), {
  loading: () => <AppLoader />,
});

const ResetPassword = dynamic(() => import('../modules/auth/ResetPassword'), {
  loading: () => <AppLoader />,
});

export default AppPage(() => {
  const router = useRouter();
  if (router.query.mode === 'resetPassword') return <ResetPassword />;
  if (router.query.mode === 'verifyEmail') return <ConfirmEmail />;
});
