import {createSlice} from '@reduxjs/toolkit';

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
      state = {...state, navCollapsed: !state.navCollapsed};
    },
    setInitialPath: (state, actions) => {
      state = {...state, initialPath: actions.payload};
    },
    routeChange: (state) => {
      state = {...state, initialPath: '/'};
    },
  },
});

export const {toggleNavCollapsed, setInitialPath, routeChange} =
  settingsSlice.actions;

export default settingsSlice.reducer;
