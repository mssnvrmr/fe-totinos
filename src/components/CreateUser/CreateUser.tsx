import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp } from '../../api/users';
import { UserRolesEnum } from '../../constants/user-roles';
import { useAuth } from '../Auth/AuthContext';
import { PasswordField } from '../FormFields/PasswordField/PasswordField';
import { PhoneField } from '../FormFields/PhoneField/PhoneField';
import { EmailField } from '../FormFields/EmailField/EmailField';
import { CustomTextField } from '../FormFields/CustomTextField/CustomTextField';
import { CustomSelectField } from '../FormFields/CustomSelectField/CustomSelectField';
import { createUserSchema, type CreateUserFormData } from '../../pages/SignUp/CreateUserSchema';

interface CreateUserProps {
  submitLabel: string;
  onSuccess?: () => void;
}

export const CreateUser = ({
  submitLabel,
  onSuccess,
}: CreateUserProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isPending } = useSignUp();
  const { role } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: '',
      phone: '',
      email: '',
      password: '',
      role: UserRolesEnum.USER,
    },
  });

  const onSubmit = (data: CreateUserFormData) => {
    mutate(data, {
      onSuccess: () => {
        enqueueSnackbar('Signed up successfully', { variant: 'success' });
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (error) => {
        enqueueSnackbar(`Actionfailed: ${error.message}`, { variant: 'error' });
      },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}
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
      <PasswordField control={control} errors={errors} />
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
    </Box>
  );
};
