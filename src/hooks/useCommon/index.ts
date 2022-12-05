import { useSelector } from 'react-redux';
import {
  clearAlertErrorMessage,
  Common,
  fetchError,
  fetchStart,
  fetchSuccess,
  onToggleAppDrawer,
  showAlert,
  showMessage,
} from 'redux/slices/common';
import { RootState, useAppDispatch } from 'redux/store';

export function useCommon() {
  const common = useSelector((state: RootState) => state.common);
  const dispatch = useAppDispatch();

  return {
    common,
    fetchError: (error: string) => dispatch(fetchError(error)) as any,
    fetchStart: () => dispatch(fetchStart()) as any,
    fetchSuccess: () => dispatch(fetchSuccess()) as any,
    clearAlertErrorMessage: () => dispatch(clearAlertErrorMessage()) as any,
    onToggleAppDrawer: () => dispatch(onToggleAppDrawer()) as any,
    showMessage: (message: string) => dispatch(showMessage(message)) as any,
    showAlert: (params: Common['alert']) => dispatch(showAlert(params)) as any,
  };
}
