import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  createUpdateRole,
  CreateUpdateRoleParams,
  deleteRole,
  fetchRole,
  fetchRoles,
} from 'redux/slices/roles';
import { RootState, useAppDispatch } from 'redux/store';

export function useRoles() {
  const state = useSelector((state: RootState) => state.roles);
  const dispatch = useAppDispatch();

  return {
    roles: state.data,
    loading: state.loading,
    fetchRoles: async (): Promise<Role[]> =>
      ((await dispatch(fetchRoles())) as any).payload,
    fetchRole: async (roleName: string): Promise<Role> =>
      ((await dispatch(fetchRole({ roleName }))) as any).payload,
    createUpdateRole: async (params: CreateUpdateRoleParams): Promise<Role> =>
      ((await dispatch(createUpdateRole(params))) as any).payload,
    deleteRole: async (roleName: string): Promise<Pick<Role, 'roleName'>> =>
      ((await dispatch(deleteRole({ roleName }))) as any).payload,
  };
}
