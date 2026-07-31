import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useLogin } from '../../api/users';
import { useAuth } from '../../components/Auth/AuthContext';
import { ROUTES } from '../../config/routes';
import { Main } from '../../components/templates/Main/Main';

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
      <Typography variant="h4" sx={{ mb: 3 }}>
        Log In
      </Typography>
      <Paper elevation={3} sx={{ maxWidth: '30%', p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            fullWidth
            disabled={isPending}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            fullWidth
            disabled={isPending}
          />
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Log In'}
          </Button>
        </Box>
      </Paper>
    </Main>
  );
};
