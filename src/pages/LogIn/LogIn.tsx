import { useForm } from 'react-hook-form';
import { Stack, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useLogin } from '../../api/users';
import { useAuth } from '../../components/Auth/useAuth';
import { ROUTES } from '../../config/routes';
import { Main } from '../../components/Templates/Main/Main';
import { BiSolidLogIn } from "react-icons/bi";
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { loginSchema, type LoginFormData } from './LoginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordField } from '../../components/FormFields/PasswordField/PasswordField';
import { EmailField } from '../../components/FormFields/EmailField/EmailField';
import CircularProgress from '@mui/material/CircularProgress';

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
        navigate(ROUTES.MENU);
      },
      onError: (error) => {
        enqueueSnackbar(`Login failed: ${error.message}`, { variant: 'error' });
      },
    });
  };

  return (
    <Main>
      <PageHeader title="Log In" icon={<BiSolidLogIn />} />
      <Paper elevation={3} sx={{ width: { xs: '100%', md: '40%', lg: '30%' }, p: 4 }}>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%', gap: 3 }}>
          <EmailField control={control} errors={errors} />
          <PasswordField control={control} errors={errors} />
          <Button type="submit" variant="contained" disabled={isPending}>
            {isSubmitting ? <CircularProgress size={30} /> : 'Log In'}
          </Button>
        </Stack>
      </Paper>
    </Main>
  );
};
