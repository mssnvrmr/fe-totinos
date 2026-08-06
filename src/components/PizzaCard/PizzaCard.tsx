import type { Pizza } from "../../interfaces/Pizza";
import type { OrderItem } from "../../interfaces/Order";
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
  Link,
} from '@mui/material';
import { PiPizzaFill } from "react-icons/pi";
import { MdModeEditOutline } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import { useGetIngredients } from "../../api/ingredients";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { itemFormSchema, type ItemFormData } from './ItemForm.schema';
import { CustomSelectField } from '../FormFields/CustomSelectField/CustomSelectField';
import { NumberSpinner } from '../FormFields/NumberSpinner/NumberSpinner';
import getPizzaIngredients from "../../utils/get-pizza-ingredients";
import { useAuth } from '../Auth/useAuth';
import { UserRolesEnum } from "../../constants/user-roles";
import { ROUTES } from "../../config/routes";

interface PizzaCardProps {
  pizza: Pizza;
  onAddItem: (item: OrderItem) => boolean;
  onEditPizza: (pizza: Pizza) => void;
  onDeletePizza: (pizza: Pizza) => void;
}

export const PizzaCard = ({ pizza, onAddItem, onEditPizza, onDeletePizza }: PizzaCardProps) => {
  const { data: extras = [] } = useGetIngredients();
  const pizzaIngredients = getPizzaIngredients(pizza, extras);
  const ingredientNamesString = pizzaIngredients.map((ingredient) => ingredient.name).join(', ');
  const { isAuthenticated, role } = useAuth();
  const isAdmin = role === UserRolesEnum.ADMIN;

  const {
    control,
    handleSubmit,
    reset,
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
    const selectedExtras = extras.filter((extra) => data.extras?.includes(extra.id));

    const added = onAddItem({
      pizza,
      quantity: data.quantity,
      extras: selectedExtras,
    });

    if (!added) return;

    reset({
      pizza: pizza.id,
      extras: [],
      quantity: 1,
    });
  };

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
          isAdmin ? (
            <Stack direction="row" spacing={0.5}>
              <Tooltip title="Edit">
                <IconButton color="secondary" onClick={() => onEditPizza(pizza)}>
                  <MdModeEditOutline size={15} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton color="secondary" onClick={() => onDeletePizza(pizza)}>
                  <BsTrash3Fill size={15} />
                </IconButton>
              </Tooltip>
            </Stack>
          ) : null}
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
        <Stack sx={{ gap: 1, overflowY: 'auto' }}>
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
        </Stack>
        <Stack direction="row" sx={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Typography variant="h6" sx={{ color: 'secondary.main' }}>Price</Typography>
          <Typography variant="h6">${pizza.price.toFixed(2)}</Typography>
        </Stack>
        <Divider />
        {isAuthenticated ? (
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
              <Button
                fullWidth
                type="button"
                variant="outlined"
                color="secondary"
                disabled={isSubmitting}
                onClick={() =>
                  reset({
                    pizza: pizza.id,
                    extras: [],
                    quantity: 1,
                  })
                }
              >
                Clear
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Typography align="center" variant="body2">Hungry? <Link href={ROUTES.LOG_IN} color="secondary">Log in</Link> or <Link href={ROUTES.SIGN_UP} color="secondary">Sign up</Link> to add pizzas to your order</Typography>
          )}
      </CardContent>
    </Card>
  );
};
