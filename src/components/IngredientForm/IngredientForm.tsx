import { Stack, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomTextField } from '../FormFields/CustomTextField/CustomTextField';
import { createIngredientSchema, type CreateIngredientFormData } from './IngredientForm.schema';
import { useCreateIngredient } from '../../api/ingredients';


interface CreateIngredientProps {
  submitLabel: string;
  onSuccess?: () => void;
}

export const CreateIngredient = ({
  submitLabel,
  onSuccess,
}: CreateIngredientProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isPending } = useCreateIngredient();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateIngredientFormData>({
    resolver: zodResolver(createIngredientSchema),
    defaultValues: {
      name: '',
      price: 0,
      stock: 0,
    },
  });

  const onSubmit = (data: CreateIngredientFormData) => {
    mutate(data, {
      onSuccess: () => {
        enqueueSnackbar(`${data.name} was created successfully`, { variant: 'success' });
        if (onSuccess) {
          onSuccess();
        }
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
        name="name"
        label="Name"
        control={control}
        errors={errors}
      />
      <CustomTextField
        name="price"
        label="Price"
        control={control}
        errors={errors}
      />
      <CustomTextField
        name="stock"
        label="Stock"
        control={control}
        errors={errors}
      />
      <Button type="submit" variant="contained" disabled={isSubmitting || isPending}>
        {isSubmitting || isPending ? <CircularProgress size={30} /> : submitLabel}
      </Button>
    </Stack>
  )
}
