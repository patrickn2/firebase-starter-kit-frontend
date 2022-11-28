import { useAuthMethod } from '@crema/utility/AuthHooks';
import IntlMessages from '@crema/utility/IntlMessages';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCommon } from 'hooks/useCommon';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import AppLogo from '../../../@crema/core/AppLayout/components/AppLogo';
import { Fonts } from '../../../shared/constants/AppEnums';
import AuthWrapper from '../AuthWrapper';

const ForgetPasswordFirebase = () => {
  const { messages } = useIntl();
  const { recoverPassword } = useAuthMethod();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: { email: string }) => {
    recoverPassword(data.email);
  };

  return (
    <AuthWrapper>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ mb: { xs: 8, xl: 10 } }}>
          <Box
            sx={{
              mb: 5,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AppLogo />
          </Box>
          <Typography
            variant='h2'
            component='h2'
            sx={{
              mb: 1.5,
              color: (theme) => theme.palette.text.primary,
              fontWeight: Fonts.SEMI_BOLD,
              fontSize: { xs: 14, xl: 16 },
            }}
          >
            <IntlMessages id='common.forgetPassword' />
          </Typography>

          <Typography
            sx={{
              pt: 3,
              fontSize: 15,
              color: 'grey.500',
            }}
          >
            <span style={{ marginRight: 4 }}>
              <IntlMessages id='common.alreadyHavePassword' />
            </span>
            <Box
              component='span'
              sx={{
                fontWeight: Fonts.MEDIUM,
                '& a': {
                  color: (theme) => theme.palette.primary.main,
                  textDecoration: 'none',
                },
              }}
            >
              <Link href={process.env.NEXT_PUBLIC_LOGIN as string}>
                {messages['common.signIn']}
              </Link>
            </Box>
          </Typography>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ my: '10px' }}>
                <Controller
                  control={control}
                  rules={{
                    required: String(messages['validation.emailRequired']),
                  }}
                  name='email'
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type='email'
                      placeholder='Email'
                      label={String(messages['common.emailAddress'])}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      value={field.value}
                      onChange={field.onChange}
                      variant='outlined'
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-input': {
                          fontSize: 14,
                        },
                      }}
                    />
                  )}
                />
              </Box>
              <Box>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{
                    fontWeight: Fonts.REGULAR,
                    textTransform: 'capitalize',
                    fontSize: 16,
                    minWidth: 160,
                  }}
                  type='submit'
                >
                  <IntlMessages id='common.sendNewPassword' />
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </AuthWrapper>
  );
};

export default ForgetPasswordFirebase;
