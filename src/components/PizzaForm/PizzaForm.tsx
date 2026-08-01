import { Stack, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomTextField } from '../FormFields/CustomTextField/CustomTextField';
import { CustomSelectField } from '../FormFields/CustomSelectField/CustomSelectField';
import { pizzaFormSchema, type PizzaFormData } from './PizzaForm.schema';
import { useCreatePizza, useUpdatePizza } from '../../api/pizza';
import { useGetIngredients } from '../../api/ingredients';
import type { Pizza } from '../../interfaces/Pizza';

interface PizzaFormProps {
  submitLabel: string;
  onSuccess?: () => void;
  pizza?: Pizza;
}

export const PizzaForm = ({
  submitLabel,
  onSuccess,
  pizza,
}: PizzaFormProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: ingredients = [] } = useGetIngredients();
  const { mutate: createPizza, isPending: isCreating } = useCreatePizza();
  const { mutate: updatePizza, isPending: isUpdating } = useUpdatePizza();
  const isEditMode = !!pizza;
  const isPending = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PizzaFormData>({
    resolver: zodResolver(pizzaFormSchema),
    defaultValues: {
      id: pizza?.id ?? '',
      name: pizza?.name ?? '',
      ingredients: pizza?.ingredients ?? [],
      description: pizza?.description ?? '',
      price: pizza?.price ?? 0,
    },
  });

  const onSubmit = (data: PizzaFormData) => {
    if (isEditMode) {
      updatePizza(
        { id: pizza.id, ...data },
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

    createPizza(data, {
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
      {isEditMode && (
        <CustomTextField
          name="id"
          label="Id"
          control={control}
          errors={errors}
          isDisabled={true}
        />
      )}
      <CustomTextField
        name="name"
        label="Name"
        control={control}
        errors={errors}
      />
      <CustomSelectField
        name="ingredients"
        label="Ingredients"
        control={control}
        errors={errors}
        multiple
        options={ingredients.map((ingredient) => ({
          value: ingredient.id,
          label: ingredient.name,
        }))}
      />
      <CustomTextField
        name="description"
        label="Description"
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
      <Button type="submit" variant="contained" disabled={isSubmitting || isPending}>
        {isSubmitting || isPending ? <CircularProgress size={30} /> : submitLabel}
      </Button>
    </Stack>
  );
};
