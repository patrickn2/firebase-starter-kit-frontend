import { useCommon } from 'hooks/useCommon';
import { useRoles } from 'hooks/useRoles';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  auth,
  facebookAuthProvider,
  githubAuthProvider,
  googleAuthProvider,
  twitterAuthProvider,
} from '../../services/firebase';

export interface AuthUser {
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  token?: string;
  role?: Partial<Pick<Role, 'roleName'>> & Omit<Role, 'roleName'>;
}

export interface AuthenticationProps {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
export interface AuthenticationHookProps extends AuthenticationProps {
  canDo: (route: RouteList, permission: PermissionList) => boolean;
}

export interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface FirebaseActionsProps {
  createUserWithEmailAndPassword: (data: SignUpProps) => void;
  signInWithEmailAndPassword: (data: SignInProps) => void;
  signInWithPopup: (type: string) => void;
  recoverPassword: (email: string) => void;
  confirmEmail: (code: string) => void;
  resetPassword: (code: string, newPassword: string) => void;
  logout: () => void;
}

const FirebaseContext = createContext<AuthenticationProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const FirebaseActionsContext = createContext<FirebaseActionsProps>({
  createUserWithEmailAndPassword: () => {},
  signInWithEmailAndPassword: () => {},
  signInWithPopup: () => {},
  recoverPassword: () => {},
  confirmEmail: () => {},
  resetPassword: () => {},
  logout: () => {},
});

export const useFirebase = () => useContext(FirebaseContext);

export const useFirebaseActions = () => useContext(FirebaseActionsContext);

interface FirebaseAuthProviderProps {
  children: ReactNode;
}

const FirebaseAuthProvider = ({ children }: FirebaseAuthProviderProps) => {
  const { fetchStart, fetchSuccess, fetchError, showAlert } = useCommon();
  const [firebaseData, setFirebaseData] = useState<AuthenticationProps>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  const { fetchRole } = useRoles();

  const handleFirebaseData = async (data: AuthenticationProps) => {
    const finalData = { ...data };

    if (finalData.user && finalData.user.uid) {
      const tokenResult = await auth.currentUser?.getIdTokenResult();

      const currentUserRole = (tokenResult?.claims.role ?? 'User') as string;

      switch (currentUserRole) {
        case 'Admin':
          finalData.user.role = { roleName: 'Admin' };
          break;

        case 'User':
          // Search for user custom permissions
          finalData.user.role = {
            roleName: currentUserRole,
          };
          break;

        default:
          // All other Users search first for the Role and then their custom permissions
          {
            const rolePermissions = await fetchRole(currentUserRole);

            finalData.user.role = {
              ...rolePermissions,
              roleName: currentUserRole,
            };
          }
          break;
      }
      finalData.user.token = tokenResult?.token;
    }
    setFirebaseData(finalData);
  };

  useEffect(() => {
    const getAuthUser = auth.onAuthStateChanged((user) => {
      if (user?.emailVerified) {
        handleFirebaseData({
          user: user as AuthUser,
          isAuthenticated: Boolean(user),
          isLoading: false,
        });
      } else {
        handleFirebaseData({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    });
    return () => {
      getAuthUser();
    };
  }, [firebaseData.user]);

  const getProvider = (providerName: string) => {
    switch (providerName) {
      case 'google': {
        return googleAuthProvider;
      }
      case 'facebook': {
        return facebookAuthProvider;
      }
      case 'twitter': {
        return twitterAuthProvider;
      }
      case 'github': {
        return githubAuthProvider;
      }
      default:
        return googleAuthProvider;
    }
  };

  const signInWithPopup = async (providerName: string) => {
    fetchStart();
    try {
      await auth.signInWithPopup(getProvider(providerName));
      fetchSuccess();
    } catch ({ message }) {
      fetchError(
        (message as string).replace('Firebase: ', '').replace(/\(.*\)./i, ''),
      );
    }
  };

  const signInWithEmailAndPassword = async ({
    email,
    password,
  }: SignInProps) => {
    fetchStart();
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      fetchSuccess();
      if (!user?.emailVerified && user?.email) {
        await user?.sendEmailVerification({
          url: window.location.origin + process.env.NEXT_PUBLIC_LOGIN,
          handleCodeInApp: true,
        });
        showAlert({
          title: 'Email is not confirmed',
          description: `An email was sent to ${user.email} with instructions to confirm your email.`,
          redirectOnClose: process.env.NEXT_PUBLIC_LOGIN,
        });
      }
    } catch ({ message }) {
      fetchError(
        (message as string).replace('Firebase: ', '').replace(/\(.*\)./i, ''),
      );
    }
  };
  const createUserWithEmailAndPassword = async ({
    name,
    email,
    password,
  }: SignUpProps) => {
    fetchStart();
    try {
      await auth.createUserWithEmailAndPassword(email, password);

      await auth.currentUser?.sendEmailVerification({
        url: window.location.origin + process.env.NEXT_PUBLIC_LOGIN,
        handleCodeInApp: true,
      });
      await auth.currentUser?.updateProfile({
        displayName: name,
      });
      fetchSuccess();
      showAlert({
        title: `Email sent`,
        description: `An email was sent to ${email} to confirm your account`,
        redirectOnClose: process.env.NEXT_PUBLIC_LOGIN,
      });
    } catch ({ message }) {
      fetchError(
        (message as string).replace('Firebase: ', '').replace(/\(.*\)./i, ''),
      );
    }
  };

  const confirmEmail = async (code: string) => {
    try {
      fetchStart();
      await auth.applyActionCode(code);
      fetchSuccess();
    } catch (error) {
      fetchSuccess();
      showAlert({
        title: `Invalid Code`,
        description: `Your confirmation code is invalid or you already confirmed your email! Try to login or copy the full URL and past at your browser address bar`,
        redirectOnClose: process.env.NEXT_PUBLIC_LOGIN,
      });
    }
  };

  const resetPassword = async (code: string, newPassword: string) => {
    try {
      fetchStart();
      await auth.confirmPasswordReset(code, newPassword);
      fetchSuccess();
      showAlert({
        title: `Password changed`,
        description: `Your password was successfully changed. Go to the Login Page and Login`,
        redirectOnClose: process.env.NEXT_PUBLIC_LOGIN,
      });
    } catch ({ message }) {
      fetchSuccess();
      fetchError(
        (message as string).replace('Firebase: ', '').replace(/\(.*\)./i, ''),
      );
    }
  };
  const logout = async () => {
    setFirebaseData({ ...firebaseData, isLoading: true });
    try {
      await auth.signOut();
    } catch ({ message }) {
      fetchError(
        (message as string).replace('Firebase: ', '').replace(/\(.*\)./i, ''),
      );
    }
  };

  const recoverPassword = async (email: string) => {
    fetchStart();
    try {
      await auth.sendPasswordResetEmail(email);
      fetchSuccess();
      showAlert({
        title: 'Password recovery link sent',
        description: `An email was sent to ${email} with instructions to reset your
      password.`,
        redirectOnClose: process.env.NEXT_PUBLIC_LOGIN,
      });
    } catch ({ message }) {
      fetchError(
        (message as string).replace('Firebase: ', '').replace(/\(.*\)./i, ''),
      );
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <FirebaseActionsContext.Provider
        value={{
          signInWithEmailAndPassword,
          createUserWithEmailAndPassword,
          signInWithPopup,
          recoverPassword,
          confirmEmail,
          resetPassword,
          logout,
        }}
      >
        {children}
      </FirebaseActionsContext.Provider>
    </FirebaseContext.Provider>
  );
};
export default FirebaseAuthProvider;
