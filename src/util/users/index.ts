import { auth } from 'services/firebase';

export const getFirebaseUserTokenId = async () => {
  return await auth.currentUser?.getIdToken();
};
