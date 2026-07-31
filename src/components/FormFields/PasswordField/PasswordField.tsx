import { TextField } from '@mui/material';
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface PasswordFieldProps<T extends FieldValues & { password: string }> {
  control: Control<T>;
  errors: FieldErrors<T>;
}

export const PasswordField = <T extends FieldValues & { password: string }>({
  control,
  errors,
}: PasswordFieldProps<T>) => {
  return (
    <Controller
      name={'password' as Path<T>}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors.password?.message as string | undefined}
          size="small"
        />
      )}
    />
  );
};
