import { InputAdornment, TextField } from '@mui/material';
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
  startAdornment?: string | React.ReactNode;
  endAdornment?: string | React.ReactNode;
}

export const CustomTextField = <T extends FieldValues>({
  name,
  control,
  errors,
  label,
  type,
  autoComplete,
  autoFocus,
  startAdornment,
  endAdornment,
}: CustomTextFieldProps<T>) => {
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          slotProps={{
            input: {
              startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : undefined,
              endAdornment: endAdornment
                ? <InputAdornment position="end">{endAdornment}</InputAdornment>
                : undefined,
            },
          }}
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
          onChange={(event) => {
            if (type === 'number') {
              const value = event.target.value;
              field.onChange(value === '' ? undefined : Number(value));
              return;
            }
            field.onChange(event);
          }}
        />
      )}
    />
  );
};
