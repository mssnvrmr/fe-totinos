import { Stack, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp, useUpdateUser } from '../../api/users';
import { UserRolesEnum } from '../../constants/user-roles';
import { useAuth } from '../Auth/AuthContext';
import { PasswordField } from '../FormFields/PasswordField/PasswordField';
import { PhoneField } from '../FormFields/PhoneField/PhoneField';
import { EmailField } from '../FormFields/EmailField/EmailField';
import { CustomTextField } from '../FormFields/CustomTextField/CustomTextField';
import { CustomSelectField } from '../FormFields/CustomSelectField/CustomSelectField';
import { createUserSchema, type CreateUserFormData } from './UserForm.schema';
import type { User } from '../../interfaces/User';

interface UserFormProps {
  submitLabel: string;
  onSuccess?: (username?: string) => void;
  user?: User;
}

export const UserForm = ({
  submitLabel,
  onSuccess,
  user,
}: UserFormProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: createUser, isPending: isCreating } = useSignUp();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { role } = useAuth();
  const isEditMode = !!user;
  const isPending = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      id: user?.id ?? '',
      username: user?.username ?? '',
      phone: user?.phone ?? '',
      email: user?.email ?? '',
      password: '',
      role: user?.role ?? UserRolesEnum.USER,
    },
  });

  const onSubmit = (data: CreateUserFormData) => {
    if (isEditMode) {
      const { password, ...rest } = data;
      updateUser(
        {
          id: user.id,
          username: rest.username,
          phone: rest.phone,
          email: rest.email,
          role: rest.role,
          ...(password ? { password } : {}),
        },
        {
          onSuccess: () => {
            enqueueSnackbar(`${data.username} was updated successfully`, { variant: 'success' });
            onSuccess?.(data.username);
          },
          onError: (error) => {
            enqueueSnackbar(`Update failed: ${error.message}`, { variant: 'error' });
          },
        },
      );
      return;
    }

    createUser(data, {
      onSuccess: () => {
        enqueueSnackbar(`${data.username} was created successfully`, { variant: 'success' });
        onSuccess?.(data.username);
      },
      onError: (error) => {
        enqueueSnackbar(`Creation failed: ${error.message}`, { variant: 'error' });
      },
    });
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: '100%', gap: 2 }}
    >
      <CustomTextField
        name="username"
        control={control}
        errors={errors}
        label="Username"
        type="text"
        autoComplete="username"
        autoFocus
      />
      <PhoneField control={control} errors={errors} />
      <EmailField control={control} errors={errors} />
      <PasswordField control={control} errors={errors} required={!isEditMode} />
      {role === UserRolesEnum.ADMIN && (
        <CustomSelectField
          name="role"
          control={control}
          errors={errors}
          label="Role"
          options={Object.values(UserRolesEnum).map((userRole) => ({
            value: userRole,
            label: userRole,
          }))}
        />
      )}
      <Button type="submit" variant="contained" disabled={isSubmitting || isPending}>
        {isSubmitting || isPending ? <CircularProgress size={30} /> : submitLabel}
      </Button>
    </Stack>
  );
};
