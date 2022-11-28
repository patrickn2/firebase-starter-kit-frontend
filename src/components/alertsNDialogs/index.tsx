import AppLoader from '@crema/core/AppLoader';
import { useCommon } from 'hooks/useCommon';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AlertDialog from './AlertDialog';
import GeneralAlert from './GeneralAlert';
const AlertsDialogs = () => {
  const { common, clearAlertErrorMessage } = useCommon();
  const router = useRouter();

  const showMessage = () => {
    return <GeneralAlert variant='success' message={common.message} />;
  };

  const showError = () => {
    return <GeneralAlert variant='error' message={common.error} />;
  };

  const showAlertDialog = () => {
    const handleClose = () => {
      const redirect = common.alert.redirectOnClose ?? undefined;
      clearAlertErrorMessage();
      if (redirect) router.push(redirect);
    };

    return (
      <AlertDialog
        open={!!common.alert.description}
        handleClose={handleClose}
        title={common.alert.title}
        description={common.alert.description}
      />
    );
  };

  return (
    <>
      {common.loading ? <AppLoader /> : null}

      {common.message ? showMessage() : null}
      {common.error ? showError() : null}
      {common.alert.description ? showAlertDialog() : null}
    </>
  );
};

export default AlertsDialogs;
