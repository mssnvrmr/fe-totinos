import { Main } from '../../components/Templates/Main/Main';
import { MdRestaurantMenu } from "react-icons/md";
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PizzaCarousel } from '../../components/PizzaCarousel/PizzaCarousel';
import { useGetPizzas } from '../../api/pizza';
import { Stack } from '@mui/material';
import type { OrderItem } from '../../interfaces/Order';
import { useState } from 'react';
import { OrderSummary } from '../../components/OrderSummary/OrderSummar';

export const Menu = () => {
  const { data: pizzas = [] } = useGetPizzas();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  return (
    <Main>
      <PageHeader title="Menu" icon={<MdRestaurantMenu />} />
      <Stack direction="row">
        <PizzaCarousel pizzas={pizzas} />
        <OrderSummary orderItems={orderItems} />
      </Stack>
    </Main>
  );
};