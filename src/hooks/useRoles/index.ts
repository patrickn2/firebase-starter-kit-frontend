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

export function useRoles(fRoles?: boolean) {
  const state = useSelector((state: RootState) => state.roles);
  const dispatch = useAppDispatch();

  const fetchUsersFunc = async (): Promise<Role[]> =>
    ((await dispatch(fetchRoles())) as any).payload;

  useEffect(() => {
    if (fRoles) fetchUsersFunc();
  }, []);

  return {
    roles: state.data,
    loading: state.loading,
    fetchRoles: fetchUsersFunc,
    fetchRole: async (roleName: string): Promise<Role> =>
      ((await dispatch(fetchRole({ roleName }))) as any).payload,
    createUpdateRole: async (params: CreateUpdateRoleParams): Promise<Role> =>
      ((await dispatch(createUpdateRole(params))) as any).payload,
    deleteRole: async (roleName: string): Promise<Pick<Role, 'roleName'>> =>
      ((await dispatch(deleteRole({ roleName }))) as any).payload,
  };
}
