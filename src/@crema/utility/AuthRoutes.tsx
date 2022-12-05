import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import { useAuthUser } from '../../hooks/useAuthUser';
import { AppLoader } from '../index';

interface AuthRoutesProps {
  children: ReactNode;
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({ children }) => {
  const { isLoading } = useAuthUser();
  return isLoading ? <AppLoader /> : <>{children}</>;
};

export default AuthRoutes;

AuthRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
