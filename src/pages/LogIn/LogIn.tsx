import { useForm, Controller } from 'react-hook-form';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useLogin } from '../../api/users';
import { useAuth } from '../../components/Auth/AuthContext';
import { ROUTES } from '../../config/routes';
import { Main } from '../../components/templates/Main/Main';
import { BiSolidLogIn } from "react-icons/bi";
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { loginSchema, type LoginFormData } from './LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const LogIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isPending } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    mutate(data, {
      onSuccess: ({ token, name, role }) => {
        login(token, name, role);
        enqueueSnackbar('Logged in successfully', { variant: 'success' });
        navigate(ROUTES.ORDERS);
      },
      onError: (error) => {
        enqueueSnackbar(`Login failed: ${error.message}`, { variant: 'error' });
      },
    });
  };

  return (
    <Main>
      <PageHeader title="Log In" icon={<BiSolidLogIn />} />
      <Paper elevation={3} sx={{ maxWidth: '40%', p: 4 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate  sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Controller name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email?.message}
                size="small"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                size="small"
              />
            )}
          />

          <Button type="submit" variant="contained" disabled={isPending}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </Button>
        </Box>
      </Paper>
    </Main>
  );
};
