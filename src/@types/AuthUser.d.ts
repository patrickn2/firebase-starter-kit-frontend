interface AuthUser {
  id?: number;
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  token?: string;
  role?: Partial<Pick<Role, 'roleName'>> & Omit<Role, 'roleName'>;
}
