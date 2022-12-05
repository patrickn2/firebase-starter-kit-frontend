import Router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthUser } from '../../../hooks/useAuthUser';
import { initialUrl } from '../../../shared/constants/AppConst';
import AppLoader from '../../core/AppLoader';

const withData = (ComposedComponent) => (props) => {
  const { user, isLoading } = useAuthUser();
  const { asPath } = useRouter();
  const queryParams = asPath.split('?')[1];
  useEffect(() => {
    if (user) {
      Router.push(initialUrl + (queryParams ? '?' + queryParams : ''));
    }
  }, [user]);
  if (isLoading) return <AppLoader />;
  if (user) return <AppLoader />;

  return <ComposedComponent {...props} />;
};

export default withData;
