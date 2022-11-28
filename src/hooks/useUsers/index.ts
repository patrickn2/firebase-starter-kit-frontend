import { useAuthUser } from '@crema/utility/AuthHooks';
import { useDispatch, useSelector } from 'react-redux';
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
import type { RootState } from 'redux/store';

export function useUsers() {
  const { user } = useAuthUser();
  const state = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  return {
    users: state.data,
    loading: state.loading,
    fetchUsers: async (params: FetchUsersParams): Promise<FetchUsersResponse> =>
      (
        (await dispatch(
          fetchUsers({ ...params, tokenId: user?.token ?? '' }),
        )) as any
      ).payload,
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
