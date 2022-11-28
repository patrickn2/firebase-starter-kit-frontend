// ForJWT Auth
/*import { getUserFromJwtAuth } from "./helper/AuthHelper";
import {
  useJWTAuth,
  useJWTAuthActions,
} from "../services/auth/jwt-auth/JWTAuthProvider";

export const useAuthUser = () => {
  const { user, isAuthenticated, isLoading } = useJWTAuth();
  return {
    isLoading,
    isAuthenticated,
    user: getUserFromJwtAuth(user),
  };
};

export const useAuthMethod = () => {
  const { signInUser, signUpUser, logout } = useJWTAuthActions();

  return {
    signInUser,
    logout,
    signUpUser,
  };
};*/

//For Firebase Auth
import { AuthUser } from '@crema/types/models/AuthUser';
import {
  AuthenticationHookProps,
  useFirebase,
  useFirebaseActions,
} from '../../services/firebase/FirebaseAuthProvider';

export const useAuthUser = () => {
  const { user, isAuthenticated, isLoading } = useFirebase();

  const canDo = (
    route: RouteList,
    permission: PermissionList,
    user: AuthUser | null,
  ) => {
    if (user?.role?.roleName === 'Admin') return true;
    if (user?.role?.routes?.[route]?.[permission] === true) return true;
    return false;
  };

  return {
    isLoading,
    isAuthenticated,
    canDo: (route: RouteList, permission: PermissionList) =>
      canDo(route, permission, user),
    user,
  } as AuthenticationHookProps;
};

export const useAuthMethod = () => {
  const {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    recoverPassword,
    confirmEmail,
    resetPassword,
    logout,
  } = useFirebaseActions();

  return {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    recoverPassword,
    confirmEmail,
    resetPassword,
    logout,
  };
};

/*
// For AWS Auth
import {getUserFromAWS} from './helper/AuthHelper';
import {
  useAwsCognito,
  useAwsCognitoActions,
} from '../services/auth/aws-cognito/AWSAuthProvider';

export const useAuthUser = () => {
  const {user, isAuthenticated, isLoading} = useAwsCognito();
  return {
    isLoading,
    isAuthenticated,
    user: getUserFromAWS(user),
  };
};

export const useAuthMethod = () => {
  const {
    signIn,
    signUpCognitoUser,
    confirmCognitoUserSignup,
    logout,
  } = useAwsCognitoActions();

  return {
    signIn,
    signUpCognitoUser,
    confirmCognitoUserSignup,
    logout,
  };
};*/
/*

//For Auth0
import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { getUserFromAuth0 } from "./helper/AuthHelper";

export const useAuthUser = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return {
    isLoading,
    isAuthenticated,
    user: useMemo(() => getUserFromAuth0(user), []),
  };
};

export const useAuthMethod = () => {
  const { loginWithRedirect, logout } = useAuth0();
  return { loginWithRedirect, logout };
};
*/
