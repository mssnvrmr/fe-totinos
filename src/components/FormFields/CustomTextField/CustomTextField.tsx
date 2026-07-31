import { TextField } from '@mui/material';
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface CustomTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  label: string;
  type?: string;
  autoComplete?: string;
  autoFocus?: boolean;
}

export const CustomTextField = <T extends FieldValues>({
  name,
  control,
  errors,
  label,
  type,
  autoComplete,
  autoFocus,
}: CustomTextFieldProps<T>) => {
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          required
          fullWidth
          id={String(name)}
          name={String(name)}
          label={label}
          type={type}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          error={!!error}
          helperText={error?.message as string | undefined}
          size="small"
        />
      )}
    />
  );
};
