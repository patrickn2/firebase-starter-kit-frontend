import DatePicker from '@mui/lab/DatePicker';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Form } from 'formik';
import Image from 'next/image';
import React from 'react';
import AppTextField from '../../../../@crema/core/AppFormComponents/AppTextField';
import AppGridContainer from '../../../../@crema/core/AppGridContainer';
import countries from '../../../../@crema/services/db/countries';
import IntlMessages from '../../../../@crema/utility/IntlMessages';

interface InfoFormProps {
  setFieldValue: (field: string, data: any) => void;
  values: {
    bio: string;
    dob: null | string;
    country: string;
    website: string;
  };
}

const InfoForm = ({ values, setFieldValue }: InfoFormProps) => {
  return (
    <Form autoComplete='off'>
      <AppGridContainer spacing={4}>
        <Grid item xs={12} md={12}>
          <AppTextField
            multiline
            name='bio'
            rows={3}
            fullWidth
            label={<IntlMessages id='common.yourBioDataHere' />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'relative',
              '& .MuiTextField-root': {
                width: '100%',
              },
            }}
          >
            <DatePicker
              label={<IntlMessages id='common.birthDate' />}
              value={values.dob}
              onChange={(newValue) => {
                setFieldValue('dob', newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            id='country-select-demo'
            fullWidth
            options={countries}
            autoHighlight
            onChange={(_, newValue) => {
              setFieldValue('country', newValue);
            }}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component='li'
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <Image
                  loading='lazy'
                  width='20'
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=''
                />
                {option.label} ({option.code}) +{option.phone}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={<IntlMessages id='common.country' />}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            name='website'
            fullWidth
            label={<IntlMessages id='common.website' />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            fullWidth
            name='phone'
            label={<IntlMessages id='common.phoneNumber' />}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Button
              sx={{
                position: 'relative',
                minWidth: 100,
              }}
              color='primary'
              variant='contained'
              type='submit'
            >
              <IntlMessages id='common.saveChanges' />
            </Button>
            <Button
              sx={{
                position: 'relative',
                minWidth: 100,
                ml: 2.5,
              }}
              color='primary'
              variant='outlined'
            >
              <IntlMessages id='common.cancel' />
            </Button>
          </Box>
        </Grid>
      </AppGridContainer>
    </Form>
  );
};

export default InfoForm;
