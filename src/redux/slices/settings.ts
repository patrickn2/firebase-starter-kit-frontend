import { createSlice } from '@reduxjs/toolkit';

export interface Settings {
  navCollapsed: boolean;
  initialPath: string | undefined;
}

const initialState: Settings = {
  navCollapsed: false,
  initialPath: '/',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleNavCollapsed: (state) => {
      return { ...state, navCollapsed: !state.navCollapsed };
    },
    setInitialPath: (state, { payload }) => {
      return { ...state, initialPath: payload };
    },
    routeChange: (state) => {
      return { ...state, initialPath: '/' };
    },
  },
});

export const { toggleNavCollapsed, setInitialPath, routeChange } =
  settingsSlice.actions;

export default settingsSlice.reducer;
