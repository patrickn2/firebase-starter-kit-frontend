import { AuthUser } from '@crema/types/models/AuthUser';

export const checkPermission = (
  url: string | undefined,
  role: AuthUser['role'] | null,
) => {
  if (!url) return true;

  if (role?.roleName == 'Admin') return true;

  if (!role?.routes) return false;

  if (Object.keys(role?.routes).includes(url)) return true;

  return false;
};
