import { useSelector } from 'react-redux';
import {
  routeChange,
  setInitialPath,
  toggleNavCollapsed,
} from 'redux/slices/settings';
import { RootState, useAppDispatch } from 'redux/store';

export function useSettings() {
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useAppDispatch();

  return {
    settings,
    routeChange: () => dispatch(routeChange()) as any,
    setInitialPath: (route: string) => dispatch(setInitialPath(route)) as any,
    toggleNavCollapsed: () => dispatch(toggleNavCollapsed()) as any,
  };
}
