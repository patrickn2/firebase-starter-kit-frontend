import {
  CreateUpdateRoleParams,
  DeleteRoleParams,
  FetchRoleParams,
} from 'redux/slices/roles';
import { collections } from 'services/firebase';

export const fetchRoles = async () => {
  const roles = await collections.roles.get();

  const rolesData: Role[] = [];

  roles.forEach((snapshot) => {
    rolesData.push({ ...snapshot.data(), roleName: snapshot.id } as Role);
  });

  return rolesData;
};

export const createUpdateRole = async ({
  roleName,
  ...params
}: CreateUpdateRoleParams) => {
  await collections.roles.doc(roleName).set(params, { merge: true });
  return { ...params, roleName };
};

export const deleteRole = async ({ roleName }: DeleteRoleParams) => {
  await collections.roles.doc(roleName).delete();
  return roleName;
};

export const fetchRole = async ({ roleName }: FetchRoleParams) => {
  const role = await collections.roles.doc(roleName).get();

  return { ...role.data(), roleName: role.id } as Role;
};
