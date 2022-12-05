import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import CommonReducer from 'redux/slices/common';
import RolesReducer from 'redux/slices/roles';
import SettingsReducer from 'redux/slices/settings';
import UsersReducer from 'redux/slices/users';

export const store = configureStore({
  reducer: {
    common: CommonReducer,
    roles: RolesReducer,
    users: UsersReducer,
    settings: SettingsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export type RootState = ReturnType<typeof store.getState>;
