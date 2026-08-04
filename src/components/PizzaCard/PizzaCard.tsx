import type { Pizza } from "../../interfaces/Pizza";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Divider,
  Button,
} from '@mui/material';
import { PiPizzaFill } from "react-icons/pi";
import { MdModeEditOutline } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import { useGetIngredientNames, useGetIngredients } from "../../api/ingredients";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { itemFormSchema, type ItemFormData } from './ItemForm.schema';
import { CustomSelectField } from '../FormFields/CustomSelectField/CustomSelectField';
import { NumberSpinner } from '../FormFields/NumberSpinner/NumberSpinner';

export const PizzaCard = ({ pizza }: { pizza: Pizza }) => {
  const { data: ingredientNames } = useGetIngredientNames(pizza.ingredients);
  const ingredientNamesString = ingredientNames?.map((ingredient) => ingredient.name).join(', ');
  const { data: extras = [] } = useGetIngredients();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      pizza: pizza.id,
      extras: [],
      quantity: 1,
    },
  });

  const onSubmit = (data: ItemFormData) => {
    console.log(data);
  }

  return (
    <Card
      sx={{
        width: 280,
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardHeader
        action={
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Edit">
              <IconButton color="secondary">
                <MdModeEditOutline size={15} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="secondary">
                <BsTrash3Fill size={15} />
              </IconButton>
            </Tooltip>
          </Stack>
        }
        title={pizza.name}
        sx={{
          bgcolor: 'primary.main',
          justifyContent: 'space-between',
          width: '100%',
          spacing: 1,
          '& .MuiCardHeader-action': {
            display: 'contents',
          },
          '& .MuiCardHeader-content': {
            width: '70%',
          },
          '& .MuiCardHeader-title': {
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
        }}
      />
      <CardMedia component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
        <PiPizzaFill size={70} />
      </CardMedia>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'space-between', height: '100%' }}>
      <Stack sx={{ gap: 1, justifyContent: 'space-between', flex: 1 }}>
        <Typography
          variant="body2"
          sx={{
            flex: 1,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {pizza.description}
        </Typography>
        <Stack sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ color: 'secondary.main' }}>Ingredients</Typography>
          <Typography variant="body2">
            {ingredientNamesString}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Typography variant="h6" sx={{ color: 'secondary.main' }}>Price</Typography>
          <Typography variant="h6">${pizza.price.toFixed(2)}</Typography>
        </Stack>
        
          
        </Stack>
        <Divider />
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ width: '100%', gap: 2 }}
        >
          <CustomSelectField
            name="extras"
            label="Add-ons"
            control={control}
            errors={errors}
            multiple
            options={extras.map((extra) => ({
              value: extra.id,
              label: extra.name,
            }))}
          />
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2">Quantity</Typography>
            <NumberSpinner control={control} errors={errors} name="quantity" label="Quantity" min={1} step={1} />
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button fullWidth type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              Add
            </Button>
            <Button fullWidth type="button" variant="outlined" color="secondary" disabled={isSubmitting}>
              Clear
            </Button>
          </Stack>

        </Stack>

      </CardContent>
    </Card>
  );
};
