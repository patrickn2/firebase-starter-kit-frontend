import { useAuthUser } from 'hooks/useAuthUser';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  banUnbanUser,
  BanUnbanUserParams,
  BanUnbanUserResponse,
  fetchUsers,
  FetchUsersParams,
  FetchUsersResponse,
  switchUserRole,
  SwitchUserRoleParams,
  SwitchUserRoleResponse,
} from 'redux/slices/users';
import { RootState, useAppDispatch } from 'redux/store';

export function useUsers(fetchUsersParams?: FetchUsersParams) {
  const { user } = useAuthUser();
  const state = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();

  const fetchUsersFunc = async (
    params: FetchUsersParams,
  ): Promise<FetchUsersResponse> =>
    (
      (await dispatch(
        fetchUsers({ ...params, tokenId: user?.token ?? '' }),
      )) as any
    ).payload;

  useEffect(() => {
    if (fetchUsersParams) fetchUsersFunc(fetchUsersParams);
  }, []);

  return {
    users: state.data,
    loading: state.loading,
    fetchUsers: fetchUsersFunc,
    switchUserRole: async (
      params: SwitchUserRoleParams,
    ): Promise<SwitchUserRoleResponse> =>
      (
        (await dispatch(
          switchUserRole({ ...params, tokenId: user?.token ?? '' }),
        )) as any
      ).payload,
    banUnbanUser: async (
      params: BanUnbanUserParams,
    ): Promise<BanUnbanUserResponse> =>
      (
        (await dispatch(
          banUnbanUser({ ...params, tokenId: user?.token ?? '' }),
        )) as any
      ).payload,
  };
}
