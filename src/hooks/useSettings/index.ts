import {useDispatch, useSelector} from 'react-redux';
import {
  routeChange,
  setInitialPath,
  toggleNavCollapsed,
} from 'redux/slices/settings';
import type {RootState} from 'redux/store';

export function useSettings() {
  const settings = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  return {
    settings,
    routeChange: () => dispatch(routeChange()) as any,
    setInitialPath: (route: string) => dispatch(setInitialPath(route)) as any,
    toggleNavCollapsed: () => dispatch(toggleNavCollapsed()) as any,
  };
}
