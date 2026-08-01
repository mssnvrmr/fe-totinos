import { Stack, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomTextField } from '../FormFields/CustomTextField/CustomTextField';
import { ingredientFormSchema, type IngredientFormData } from './IngredientForm.schema';
import { useCreateIngredient, useUpdateIngredient } from '../../api/ingredients';
import type { Ingredient } from '../../interfaces/Ingredient';

interface IngredientFormProps {
  submitLabel: string;
  onSuccess?: () => void;
  ingredient?: Ingredient;
}

export const IngredientForm = ({
  submitLabel,
  onSuccess,
  ingredient,
}: IngredientFormProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: createIngredient, isPending: isCreating } = useCreateIngredient();
  const { mutate: updateIngredient, isPending: isUpdating } = useUpdateIngredient();
  const isEditMode = !!ingredient;
  const isPending = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IngredientFormData>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: {
      name: ingredient?.name ?? '',
      price: ingredient?.price ?? 0,
      stock: ingredient?.stock ?? 0,
    },
  });

  const onSubmit = (data: IngredientFormData) => {
    if (isEditMode) {
      updateIngredient(
        { id: ingredient.id, ...data },
        {
          onSuccess: () => {
            enqueueSnackbar(`${data.name} was updated successfully`, { variant: 'success' });
            onSuccess?.();
          },
          onError: (error) => {
            enqueueSnackbar(`Update failed: ${error.message}`, { variant: 'error' });
          },
        },
      );
      return;
    }

    createIngredient(data, {
      onSuccess: () => {
        enqueueSnackbar(`${data.name} was created successfully`, { variant: 'success' });
        onSuccess?.();
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
        type="number"
        control={control}
        errors={errors}
        startAdornment="$"
      />
      <CustomTextField
        name="stock"
        label="Stock"
        type="number"
        control={control}
        errors={errors}
        endAdornment="gms"
      />
      <Button type="submit" variant="contained" disabled={isSubmitting || isPending}>
        {isSubmitting || isPending ? <CircularProgress size={30} /> : submitLabel}
      </Button>
    </Stack>
  );
};
