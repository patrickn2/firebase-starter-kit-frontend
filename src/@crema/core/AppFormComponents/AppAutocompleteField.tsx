import { useField } from 'formik';
import React from 'react';
import AppAutoComplete from './AppAutoComplete';

const AppAutocompleteField = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <AppAutoComplete
      {...props}
      {...field}
      helperText={!props.disabled ? errorText : ''}
      error={!!errorText}
    />
  );
};

export default AppAutocompleteField;
