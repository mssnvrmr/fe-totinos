import { TextField } from '@mui/material';
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface PhoneFieldProps<T extends FieldValues & { phone: string }> {
  control: Control<T>;
  errors: FieldErrors<T>;
}

export const PhoneField = <T extends FieldValues & { phone: string }>({ control, errors }: PhoneFieldProps<T>) => {
  return (
    <Controller
      name={'phone' as Path<T>}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          required
          fullWidth
          id="phone"
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="phone"
          autoFocus
          error={!!errors.phone}
          helperText={errors.phone?.message as string | undefined}
          size="small"
        />
      )}
    />
  );
};