import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  label: string;
  options: SelectOption[];
}

export const CustomSelectField = <T extends FieldValues>({
  name,
  control,
  errors,
  label,
  options,
}: CustomSelectFieldProps<T>) => {
  const error = errors[name];
  const labelId = `${String(name)}-label`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth required size="small" error={!!error}>
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select {...field} labelId={labelId} id={String(name)} label={label}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error?.message && (
            <FormHelperText>{error.message as string}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
