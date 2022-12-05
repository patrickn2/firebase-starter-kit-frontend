import Router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthUser } from '../../../hooks/useAuthUser';
import AppLoader from '../../core/AppLoader';

const withData = (ComposedComponent) => (props) => {
  const { user, isLoading } = useAuthUser();
  const { asPath } = useRouter();
  const queryParams = asPath.split('?')[1];
  useEffect(() => {
    if (!user && !isLoading) {
      Router.push(
        process.env.NEXT_PUBLIC_LOGIN + (queryParams ? '?' + queryParams : ''),
      );
    }
  }, [user, isLoading]);
  if (!user || isLoading) return <AppLoader />;

  return <ComposedComponent {...props} />;
};
export default withData;
