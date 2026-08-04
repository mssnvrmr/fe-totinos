import { TextField, IconButton, InputAdornment, Box } from '@mui/material';
import { IoMdAdd } from 'react-icons/io';
import { IoMdRemove } from 'react-icons/io';
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface NumberSpinnerProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberSpinner = <T extends FieldValues>({
  control,
  errors,
  name,
  label = 'Quantity',
  min = 0,
  max = 100,
  step = 1,
}: NumberSpinnerProps<T>) => {
  const error = errors[name];

  const clamp = (value: number) => Math.max(min, Math.min(max, value));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const value = typeof field.value === 'number' ? field.value : min;

        const updateValue = (next: number) => {
          field.onChange(clamp(next));
        };

        return (
          <Box sx={{ maxWidth: 80 }}>
            <TextField
              id={String(name)}
              name={String(name)}
              value={value}
              onChange={(e) => {
                const parsed = parseInt(e.target.value, 10);
                if (!isNaN(parsed)) {
                  updateValue(parsed);
                } else if (e.target.value === '') {
                  field.onChange(min);
                }
              }}
              inputRef={field.ref}
              variant="standard"
              size="small"
              error={!!error}
              helperText={error?.message as string | undefined}
              slotProps={{
                htmlInput: {
                  style: { textAlign: 'center' },
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() => updateValue(value - step)}
                        disabled={value <= min}
                        size="small"
                        edge="start"
                      >
                        <IoMdRemove fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => updateValue(value + step)}
                        disabled={value >= max}
                        size="small"
                        edge="end"
                      >
                        <IoMdAdd fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        );
      }}
    />
  );
};
