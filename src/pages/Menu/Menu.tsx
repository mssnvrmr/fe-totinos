import { Main } from '../../components/Templates/Main/Main';
import { MdRestaurantMenu } from "react-icons/md";
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PizzaCarousel } from '../../components/PizzaCarousel/PizzaCarousel';
import { useGetPizzas } from '../../api/pizza';
import { Stack, TextField } from '@mui/material';
import type { OrderItem } from '../../interfaces/Order';
import { useState } from 'react';
import { OrderSummary } from '../../components/OrderSummary/OrderSummary';

export const Menu = () => {
  const { data: pizzas = [] } = useGetPizzas();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [notes, setNotes] = useState('');
  const handleAddItem = (item: OrderItem) => {
    setOrderItems((prev) => [...prev, item]);
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };
  const handleRemoveItemFromOrder = (index: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateNotes = (notes: string) => {
    setNotes(notes);
  };

  return (
    <Main>
      <PageHeader title="Menu" icon={<MdRestaurantMenu />} />
      <Stack direction="row" sx={{ height: '100%', width: '100%', justifyContent: 'space-between', gap: 2 }}>
        <PizzaCarousel pizzas={pizzas} onAddItem={handleAddItem} />
        <OrderSummary orderItems={orderItems} notes={notes} onClearOrder={handleClearOrder} onRemoveItemFromOrder={handleRemoveItemFromOrder} onUpdateNotes={handleUpdateNotes} />
      </Stack>
    </Main>
  );
};