import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Common {
  error: string;
  loading: boolean;
  isAppDrawerOpen: boolean;
  updatingContent: boolean;
  message: string;
  alert: {
    title: string;
    description: string;
    redirectOnClose?: string;
  };
}

const initialState: Common = {
  error: '',
  loading: false,
  isAppDrawerOpen: false,
  updatingContent: false,
  message: '',
  alert: {
    title: '',
    description: '',
  },
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    fetchStart: (state) => {
      return { ...state, error: '', message: '', loading: true };
    },
    fetchSuccess: (state) => {
      return {
        ...state,
        error: '',
        message: '',
        loading: false,
        updatingContent: false,
      };
    },
    fetchError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: '',
        updatingContent: false,
      };
    },
    showMessage: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: '',
        message: action.payload,
        loading: false,
        updatingContent: false,
      };
    },
    onToggleAppDrawer: (state) => {
      state.isAppDrawerOpen = !state.isAppDrawerOpen;
    },
    clearAlertErrorMessage: (state) => {
      return {
        ...state,
        loading: false,
        error: '',
        message: '',
        updatingContent: false,
        alert: {
          title: '',
          description: '',
        },
      };
    },
    showAlert: (state, { payload }: PayloadAction<Common['alert']>) => {
      return {
        ...state,
        alert: {
          title: payload.title,
          description: payload.description,
          redirectOnClose: payload.redirectOnClose,
        },
      };
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchError,
  showMessage,
  onToggleAppDrawer,
  clearAlertErrorMessage,
  showAlert,
} = commonSlice.actions;

export default commonSlice.reducer;
