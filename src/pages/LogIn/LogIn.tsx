import React, { useState } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useLogin } from '../../api/users';
import { useAuth } from '../../components/Auth/AuthContext';
import { ROUTES } from '../../config/routes';
import { Main } from '../../components/templates/Main/Main';
import { BiSolidLogIn } from "react-icons/bi";
import { PageHeader } from '../../components/PageHeader/PageHeader';

export const LogIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: ({ token, name, role }) => {
          login(token, name, role);
          enqueueSnackbar('Logged in successfully', { variant: 'success' });
          navigate(ROUTES.ORDERS);
        },
        onError: (error) => {
          enqueueSnackbar(`Login failed: ${error.message}`, { variant: 'error' });
        },
      },
    );
  };

  return (
    <Main>
      <PageHeader title="Log In" icon={<BiSolidLogIn />} />
      <Paper elevation={3} sx={{ maxWidth: '40%', p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            required
            disabled={isPending}
            size="small"
          />
          <TextField
            label="Password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            disabled={isPending}
            error={false}
            helperText="Invalid email or password"
            size="small"
          />

          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Log In'}
          </Button>
        </Box>
      </Paper>
    </Main>
  );
};
