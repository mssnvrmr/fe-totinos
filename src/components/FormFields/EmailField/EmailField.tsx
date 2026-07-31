import { TextField } from '@mui/material';
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface EmailFieldProps<T extends FieldValues & { email: string }> {
  control: Control<T>;
  errors: FieldErrors<T>;
}

export const EmailField = <T extends FieldValues & { email: string }>({ control, errors }: EmailFieldProps<T>) => {
  return (
    <Controller
      name={'email' as Path<T>}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          required
          fullWidth
          id="email"
          name="email"
          label="Email Address"
          type="email"
          autoComplete="email"
          autoFocus
          error={!!errors.email}
          helperText={errors.email?.message as string | undefined}
          size="small"
        />
      )}
    />
  );
};