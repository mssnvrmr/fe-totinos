import { Main } from '../../components/Templates/Main/Main';
import { MdRestaurantMenu } from "react-icons/md";
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PizzaCarousel } from '../../components/PizzaCarousel/PizzaCarousel';
import { useDeletePizza, useGetPizzas } from '../../api/pizza';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import type { OrderItem } from '../../interfaces/Order';
import { useState } from 'react';
import { OrderSummary } from '../../components/OrderSummary/OrderSummary';
import type { Pizza } from '../../interfaces/Pizza';
import { CustomModal } from '../../components/CustomModal/CustomModal';
import { PizzaForm } from '../../components/PizzaForm/PizzaForm';
import { enqueueSnackbar } from 'notistack';
import { useAuth } from '../../components/Auth/AuthContext';
import { UserRolesEnum } from '../../constants/user-roles';

export const Menu = () => {
  const { data: pizzas = [] } = useGetPizzas();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [notes, setNotes] = useState('');
  const [isPizzaFormModalOpen, setIsPizzaFormModalOpen] = useState(false);
  const [isDeletePizzaModalOpen, setIsDeletePizzaModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | undefined>();
  const { mutate: deletePizza, isPending: isDeletingPizza } = useDeletePizza();
  const { role } = useAuth();
  const isAdmin = role === UserRolesEnum.ADMIN;

  const handleAddItem = (item: OrderItem) => {
    setOrderItems((prev) => [...prev, item]);
  };

  const handleClearOrder = () => {
    setOrderItems([]);
    setNotes('');
  };
  
  const handleRemoveItemFromOrder = (index: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateNotes = (notes: string) => {
    setNotes(notes);
  };

  const closePizzaFormModal = () => {
    setIsPizzaFormModalOpen(false);
    setSelectedPizza(undefined);
  };

  const closeDeletePizzaModal = () => {
    setIsDeletePizzaModalOpen(false);
    setSelectedPizza(undefined);
  };

  const handleEditPizza = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setIsPizzaFormModalOpen(true);
  };

  const handleDeletePizza = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setIsDeletePizzaModalOpen(true);
  };

  const confirmDeletePizza = () => {
    if (!selectedPizza) return;

    deletePizza(selectedPizza.id, {
      onSuccess: () => {
        enqueueSnackbar('Pizza deleted successfully', { variant: 'success' });
        closeDeletePizzaModal();
      },
      onError: (error) => {
        enqueueSnackbar(`Deletion failed: ${error.message}`, { variant: 'error' });
        closeDeletePizzaModal();
      },
    });
  };

  const handleCreateNewPizza = () => {
    setSelectedPizza(undefined);
    setIsPizzaFormModalOpen(true);
  };

  return (
    <Main>
      <PageHeader title="Menu" icon={<MdRestaurantMenu />} />
      {isAdmin && (
        <Button size="small" variant="contained" color="primary" onClick={handleCreateNewPizza}>
          Create New Pizza
        </Button>
      )}
      <CustomModal
        open={isPizzaFormModalOpen}
        onClose={closePizzaFormModal}
        title={selectedPizza ? 'Edit Pizza' : 'Create Pizza'}
      >
        <PizzaForm
          key={selectedPizza?.id ?? 'create'}
          submitLabel={selectedPizza ? 'Update' : 'Create'}
          pizza={selectedPizza}
          onSuccess={closePizzaFormModal}
        />
      </CustomModal>
      <CustomModal
        open={isDeletePizzaModalOpen}
        onClose={closeDeletePizzaModal}
        title="Delete Pizza"
      >
        <Typography variant="body1">Are you sure you want to delete this pizza?</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={confirmDeletePizza}
          disabled={isDeletingPizza}
        >
          {isDeletingPizza ? <CircularProgress size={20} /> : 'Delete'}
        </Button>
      </CustomModal>
      <Stack direction="row" sx={{ height: '100%', width: '100%', justifyContent: 'space-between', gap: 2 }}>
        <PizzaCarousel
          pizzas={pizzas}
          onAddItem={handleAddItem}
          onEditPizza={handleEditPizza}
          onDeletePizza={handleDeletePizza}
        />
        <OrderSummary
          orderItems={orderItems}
          notes={notes}
          onClearOrder={handleClearOrder}
          onRemoveItemFromOrder={handleRemoveItemFromOrder}
          onUpdateNotes={handleUpdateNotes}
        />
      </Stack>
    </Main>
  );
};
