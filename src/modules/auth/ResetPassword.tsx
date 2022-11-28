import { useAuthMethod } from '@crema/utility/AuthHooks';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import AppLogo from '../../@crema/core/AppLayout/components/AppLogo';
import IntlMessages from '../../@crema/utility/IntlMessages';
import { Fonts } from '../../shared/constants/AppEnums';
import AuthWrapper from './AuthWrapper';

const ResetPasswordAwsCognito = () => {
  const { messages } = useIntl();
  const { resetPassword } = useAuthMethod();
  const router = useRouter();

  interface ResetPasswordFormProps {
    newPassword: string;
    confirmPassword: string;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ResetPasswordFormProps>({
    mode: 'all',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ResetPasswordFormProps) => {
    const code = router.query.oobCode as string;
    resetPassword(code, data.newPassword);
  };

  const validatePasswords = (confirmPassword: string) => {
    const newPassword = getValues('newPassword');
    if (newPassword === confirmPassword) return undefined;
    return 'Passwords must match';
  };

  return (
    <AuthWrapper>
      <Box sx={{ width: '100%' }}>
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
          <IntlMessages id='common.resetPassword' />
        </Typography>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              mb: 6,
              fontSize: { xs: 16, sm: 18 },
            }}
          >
            <Typography>Enter your new password.</Typography>
          </Box>
          <Box
            sx={{
              mb: { xs: 4, lg: 6 },
            }}
          >
            <Controller
              control={control}
              name='newPassword'
              rules={{
                required: String(messages['validation.enterNewPassword']),
                minLength: {
                  value: 6,
                  message: 'The password length must have at least 6',
                },
              }}
              render={({ field }) => (
                <TextField
                  name='newPassword'
                  type='password'
                  variant='outlined'
                  label={<IntlMessages id='common.newPassword' />}
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                  fullWidth
                />
              )}
            />
          </Box>

          <Box
            sx={{
              mb: { xs: 4, lg: 6 },
            }}
          >
            <Controller
              control={control}
              name='confirmPassword'
              rules={{
                required: String(messages['validation.reTypePassword']),
                minLength: {
                  value: 6,
                  message: 'The password length must have at least 6',
                },
                validate: validatePasswords,
              }}
              render={({ field }) => (
                <TextField
                  name='confirmPassword'
                  type='password'
                  variant='outlined'
                  label={<IntlMessages id='common.retypePassword' />}
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  fullWidth
                />
              )}
            />
          </Box>

          <Button
            variant='contained'
            color='primary'
            type='submit'
            sx={{
              fontWeight: Fonts.REGULAR,
              textTransform: 'capitalize',
              fontSize: 16,
              minWidth: 160,
            }}
          >
            <IntlMessages id='common.resetMyPassword' />
          </Button>
        </form>
      </Box>
    </AuthWrapper>
  );
};

export default ResetPasswordAwsCognito;
