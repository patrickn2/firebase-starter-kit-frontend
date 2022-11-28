import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineGoogle, AiOutlineTwitter } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import { SignUpProps } from 'services/firebase/FirebaseAuthProvider';
import { useAuthMethod } from '../../../@crema/utility/AuthHooks';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { Fonts } from '../../../shared/constants/AppEnums';

const SignupFirebase = () => {
  const { createUserWithEmailAndPassword, signInWithPopup } = useAuthMethod();
  const { messages } = useIntl();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpProps>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignUpProps) => {
    createUserWithEmailAndPassword(data);
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: { xs: 4, xl: 5 } }}>
            <Controller
              name='name'
              control={control}
              rules={{ required: String(messages['validation.nameRequired']) }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={messages['common.name']}
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.name}
                  helperText={errors.name?.message}
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

          <Box sx={{ mb: { xs: 4, xl: 5 } }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: String(messages['validation.emailRequired']) }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={messages['common.email']}
                  type='email'
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.email}
                  helperText={errors.email?.message}
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

          <Box sx={{ mb: { xs: 4, xl: 5 } }}>
            <Controller
              name='password'
              control={control}
              rules={{
                required: String(messages['validation.passwordRequired']),
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={messages['common.password']}
                  type='password'
                  value={field.value}
                  onChange={field.onChange}
                  error={!!errors.password}
                  helperText={errors.password?.message}
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

          <Box
            sx={{
              mb: { xs: 3, xl: 4 },
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Checkbox
                sx={{
                  ml: -3,
                }}
              />
              <Box
                component='span'
                sx={{
                  mr: 2,
                  color: 'grey.500',
                }}
              >
                <IntlMessages id='common.iAgreeTo' />
              </Box>
            </Box>
            <Box
              component='span'
              sx={{
                color: (theme) => theme.palette.primary.main,
                cursor: 'pointer',
              }}
            >
              <IntlMessages id='common.termConditions' />
            </Box> */}
          </Box>

          <div>
            <Button
              variant='contained'
              color='primary'
              sx={{
                minWidth: 160,
                fontWeight: Fonts.REGULAR,
                fontSize: 16,
                textTransform: 'capitalize',
                padding: '4px 16px 8px',
              }}
              type='submit'
            >
              <IntlMessages id='common.signup' />
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
          <IntlMessages id='common.alreadyHaveAccount' />
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
            sx={{ p: 2, '& svg': { fontSize: 18 } }}
            onClick={() => signInWithPopup('google')}
          >
            <AiOutlineGoogle />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': { fontSize: 18 },
            }}
            onClick={() => signInWithPopup('facebook')}
          >
            <FaFacebookF />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': { fontSize: 18 },
            }}
            onClick={() => signInWithPopup('github')}
          >
            <BsGithub />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              '& svg': { fontSize: 18 },
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

export default SignupFirebase;
