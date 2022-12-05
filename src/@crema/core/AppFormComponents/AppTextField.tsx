import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { FieldHookConfig, useField } from 'formik';
import React from 'react';

const AppTextField = (props: TextFieldProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default AppTextField;
