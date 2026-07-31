import React, { useState } from 'react';
import { Box, Button, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSignUp } from '../../api/users';
import { ROUTES } from '../../config/routes';
import { Main } from '../../components/templates/Main/Main';
import { UserRolesEnum, type UserRole } from '../../constants/user-roles';
import { signUpSchema, type SignUpFormErrors, type SignUpFormValues } from './SignUpSchema';
import { z } from 'zod';

export const SignUp = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isPending } = useSignUp();
  const [formValues, setFormValues] = useState<SignUpFormValues>({
    username: '',
    phone: '',
    email: '',
    password: '',
    role: UserRolesEnum.USER
  });
  const [errors, setErrors] = useState<SignUpFormErrors>({});

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = signUpSchema.safeParse(formValues);

    if (!result.success) {
      const fieldErrors = z.flattenError(result.error).fieldErrors;
      setErrors({
        username: fieldErrors.username?.[0],
        phone: fieldErrors.phone?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        role: fieldErrors.role?.[0],
      });
      return;
    }
    
    setErrors({} as SignUpFormErrors);

    mutate({
      username: result.data.username,
      phone: result.data.phone,
      email: result.data.email,
      password: result.data.password,
      role: result.data.role,
    }, {
      onSuccess: () => {
        enqueueSnackbar('Signed up successfully', { variant: 'success' });
        navigate(ROUTES.LOG_IN);
      },
      onError: (error) => {
        enqueueSnackbar(`Sign up failed: ${error.message}`, { variant: 'error' });
      },
    })
  };

  return (
    <Main>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Sign Up
      </Typography>
      <Paper elevation={3} sx={{ width: { xs: '100%', sm: '60%', md: '30%' }, p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
            label="Username"
            type="text"
            value={formValues.username}
            onChange={(event) =>
              setFormValues({ ...formValues, username: event.target.value })
            }
            error={Boolean(errors.username)}
            helperText={errors.username}
            required
            fullWidth
            disabled={isPending}
          />
          <TextField
            label="Phone"
            type="tel"
            value={formValues.phone}
            onChange={(event) => setFormValues({ ...formValues, phone: event.target.value })}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            required
            fullWidth
            disabled={isPending}
          />
          <TextField
            label="Email"
            type="email"
            value={formValues.email}
            onChange={(event) => setFormValues({ ...formValues, email: event.target.value })}
            error={Boolean(errors.email)}
            helperText={errors.email}
            required
            fullWidth
            disabled={isPending}
          />
          <TextField
            label="Password"
            type="password"
            value={formValues.password}
            onChange={(event) => setFormValues({ ...formValues, password: event.target.value })}
            error={Boolean(errors.password)}
            helperText={errors.password}
            required
            fullWidth
            disabled={isPending}
          />
          <Select
            label="Role"
            value={formValues.role}
            onChange={(event) => setFormValues({ ...formValues, role: event.target.value as UserRole })}
            error={Boolean(errors.role)}
            required
            fullWidth
            disabled={isPending}
          >
            {Object.values(UserRolesEnum).map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Signing up...' : 'Sign Up'}
          </Button>
        </Box>
      </Paper>
    </Main>
  );
};
