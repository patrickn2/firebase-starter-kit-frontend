import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useCommon } from 'hooks/useCommon';
import Link from 'next/link';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineGoogle, AiOutlineTwitter } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import { useAuthMethod } from '../../../@crema/utility/AuthHooks';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { Fonts } from '../../../shared/constants/AppEnums';

const SigninFirebase = () => {
  const { common } = useCommon();

  const { signInWithEmailAndPassword, signInWithPopup } = useAuthMethod();
  const { messages } = useIntl();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInProps>({ defaultValues: { email: '', password: '' } });

  interface SignInProps {
    email: string;
    password: string;
  }

  const onSubmit = (data: SignInProps) => {
    signInWithEmailAndPassword(data);
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: { xs: 5, xl: 8 } }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='email'
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  placeholder={messages['common.email'] as string}
                  label={messages['common.email'] as string}
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Box>

          <Box sx={{ mb: { xs: 3, xl: 4 } }}>
            <Controller
              name='password'
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='password'
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  placeholder={messages['common.password'] as string}
                  label={messages['common.password'] as string}
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Box>

          <Box
            sx={{
              mb: { xs: 3, xl: 4 },
            }}
          >
            {/* <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Checkbox sx={{ ml: -3 }} />
              <Box
                component='span'
                sx={{
                  color: 'grey.500',
                }}
              >
                <IntlMessages id='common.rememberMe' />
              </Box>
            </Box> */}
            <Box
              component='span'
              sx={{
                fontWeight: Fonts.MEDIUM,
                '& a': {
                  color: (theme) => theme.palette.primary.main,
                  textDecoration: 'none',
                  display: 'block',
                  textAlign: 'right',
                },
              }}
            >
              <Link href={process.env.NEXT_PUBLIC_FORGET_PASSWORD as string}>
                {messages['common.forgetPassword']}
              </Link>
            </Box>
          </Box>

          <div>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              // disabled={common.loading}
              sx={{
                minWidth: 160,
                fontWeight: Fonts.REGULAR,
                fontSize: 16,
                textTransform: 'capitalize',
                padding: '4px 16px 8px',
              }}
            >
              <IntlMessages id='common.login' />
            </Button>
          </div>
        </form>
      </Box>

      <Box
        sx={{
          color: 'grey.500',
          mb: { xs: 5, md: 7 },
        }}
      >
        <span style={{ marginRight: 4 }}>
          <IntlMessages id='common.dontHaveAccount' />
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
          <Link href={process.env.NEXT_PUBLIC_REGISTER as string}>
            {messages['common.signup']}
          </Link>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: (theme) => theme.palette.background.default,
          mx: { xs: -5, lg: -10 },
          mb: { xs: -6, lg: -11 },
          mt: 'auto',
          py: 2,
          px: { xs: 5, lg: 10 },
        }}
      >
        <Box
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <IntlMessages id='common.orLoginWith' />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{
              p: 2,
              '& svg': { fontSize: 18 },
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => signInWithPopup('google')}
          >
            <AiOutlineGoogle />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': { fontSize: 18 },
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => signInWithPopup('facebook')}
          >
            <FaFacebookF />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': { fontSize: 18 },
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => signInWithPopup('github')}
          >
            <BsGithub />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': { fontSize: 18 },
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => signInWithPopup('twitter')}
          >
            <AiOutlineTwitter />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SigninFirebase;
