import { Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserRecord } from 'firebase-functions/v1/auth';
import * as api from 'redux/api/functions/users';

export interface BaseResponse {
  status: boolean;
  error?: string;
}

export interface FetchUsersResponse extends BaseResponse {
  data?: Mutable<UserRecord>[];
  perPage?: number;
  page?: number;
  totalPages?: number;
}

export interface SwitchUserRoleResponse extends BaseResponse {
  roleName?: Role['roleName'];
  userId?: string;
}
export interface BanUnbanUserResponse extends BaseResponse {
  userId?: string;
  operation?: 'ban' | 'unban';
}

export interface UsersState {
  loading: boolean;
  data: FetchUsersResponse | undefined;
}

export interface FetchUsersParams {
  perPage?: number;
  page?: number;
}

export interface SwitchUserRoleParams {
  roleName: Role['roleName'];
  userId: string;
}
export interface BanUnbanUserParams {
  userId: string;
  operation: 'ban' | 'unban';
}

const initialState: UsersState = {
  loading: false,
  data: undefined,
};

export const switchUserRole = createAsyncThunk(
  'switchUserRole',
  async (
    params: SwitchUserRoleParams & { tokenId: string },
    { rejectWithValue },
  ) => {
    try {
      return await api.switchUserRole(params);
    } catch (error) {
      return rejectWithValue(JSON.stringify(error));
    }
  },
);
export const banUnbanUser = createAsyncThunk(
  'banUnbanUser',
  async (
    params: BanUnbanUserParams & { tokenId: string },
    { rejectWithValue },
  ) => {
    try {
      return await api.banUnbanUser(params);
    } catch (error) {
      return rejectWithValue(JSON.stringify(error));
    }
  },
);

export const fetchUsers = createAsyncThunk(
  'fetchUsers',
  async (
    params: FetchUsersParams & { tokenId: string },
    { rejectWithValue },
  ) => {
    try {
      return await api.fetchUsers(params);
    } catch (error) {
      return rejectWithValue(JSON.stringify(error));
    }
  },
);

interface RejectedAction extends Action {
  error: Error;
}

const isRejectedAction = (action: Action): action is RejectedAction => {
  return action.type.endsWith('rejected');
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Roles
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => {
        console.log('ERROR', payload);
        state.loading = false;
      })

      .addCase(switchUserRole.fulfilled, (state, { payload }) => {
        const index =
          state.data?.data?.findIndex((user) => user.uid === payload.userId) ??
          -1;

        if (index !== -1)
          (state.data?.data?.[index] as Mutable<UserRecord>).customClaims = {
            role: payload.roleName,
          };
      })

      .addCase(banUnbanUser.fulfilled, (state, { payload }) => {
        const index =
          state.data?.data?.findIndex((user) => user.uid === payload.userId) ??
          -1;
        if (index !== -1)
          (state.data?.data?.[index] as Mutable<UserRecord>).disabled =
            payload.operation === 'ban' ? true : false;
      })

      .addMatcher(isRejectedAction, (state, payload) => {
        console.log('ERROR', payload);
      });
  },
});

export default usersSlice.reducer;
