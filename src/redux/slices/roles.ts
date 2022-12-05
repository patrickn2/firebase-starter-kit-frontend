import {
  Action,
  AnyAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import * as api from 'redux/api/firebase/roles';

export interface RolesState {
  loading: boolean;
  data: Role[];
}

export type FetchRoleParams = Pick<Role, 'roleName'>;

export type CreateUpdateRoleParams = Pick<Role, 'roleName'> &
  Partial<Omit<Role, 'roleName'>>;

export type DeleteRoleParams = Pick<Role, 'roleName'>;

const initialState: RolesState = {
  loading: false,
  data: [],
};

export const fetchRoles = createAsyncThunk(
  'fetchRoles',
  async (nan, { rejectWithValue }) => {
    try {
      return await api.fetchRoles();
    } catch (error) {
      return rejectWithValue(JSON.stringify(error));
    }
  },
);

export const fetchRole = createAsyncThunk(
  'fetchRole',
  async (params: FetchRoleParams, { rejectWithValue }) => {
    try {
      return await api.fetchRole(params);
    } catch (error) {
      return rejectWithValue(JSON.stringify(error));
    }
  },
);

export const createUpdateRole = createAsyncThunk(
  'updateRole',
  async (params: CreateUpdateRoleParams, { rejectWithValue }) => {
    try {
      return await api.createUpdateRole(params);
    } catch (error) {
      return rejectWithValue(JSON.stringify(error));
    }
  },
);

export const deleteRole = createAsyncThunk(
  'deleteRole',
  async (params: DeleteRoleParams, { rejectWithValue }) => {
    try {
      return await api.deleteRole(params);
    } catch (error) {
      return rejectWithValue(JSON.stringify(error));
    }
  },
);

interface RejectedAction extends Action {
  error: Error;
}
const isRejectedAction = (action: AnyAction): action is RejectedAction => {
  return action.type.endsWith('rejected');
};

export const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchRoles.rejected, (state, { payload }) => {
        console.log('ERROR', payload);
        state.loading = false;
      })
      // Create/Update Role
      .addCase(createUpdateRole.fulfilled, (state, { payload }) => {
        state.data = [
          payload,
          ...state.data.filter((sd) => sd.roleName !== payload.roleName),
        ];
      })
      // Delete Role
      .addCase(deleteRole.fulfilled, (state, { payload }) => {
        state.data = state.data.filter((sd) => sd.roleName !== payload);
      })
      .addMatcher(isRejectedAction, (state, payload) => {
        console.log('ERROR', payload);
      });
  },
});

export default rolesSlice.reducer;
