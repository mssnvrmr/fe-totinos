import React, { useState } from 'react';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useDeletePizza, useGetPizzas } from '../../api/pizza';
import { useGetIngredients } from '../../api/ingredients';
import { pizzasTableColumns } from '../../constants/pizzas-table';
import { UserRolesEnum } from '../../constants/user-roles';
import { CustomModal } from '../CustomModal/CustomModal';
import { PizzaForm } from '../PizzaForm/PizzaForm';
import { CustomDataTable } from '../CustomDataTable/CustomDataTable';
import { useAuth } from '../Auth/useAuth';
import type { Pizza } from '../../interfaces/Pizza';
import { SearchField } from '../FormFields/SearchField/SearchField';

export const PizzasTable = () => {
  const { data: pizzas = [] } = useGetPizzas();
  const { data: ingredients = [] } = useGetIngredients();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | undefined>();
  const { role } = useAuth();
  const isAdmin = role === UserRolesEnum.ADMIN;

  const { mutate: deletePizza, isPending: isDeletingPizza } = useDeletePizza();

  const ingredientNameById = new Map(ingredients.map((item) => [item.id, item.name]));
  const tableData = pizzas.map((pizza) => ({
    ...pizza,
    ingredients: pizza.ingredients.map((id) => ingredientNameById.get(id) ?? id),
  }));

  const closeModal = () => {
    setOpenModal(false);
    setSelectedPizza(undefined);
  };

  const handleDelete = (id: string) => {
    deletePizza(id, {
      onSuccess: () => {
        enqueueSnackbar('Pizza deleted successfully', { variant: 'success' });
        closeDeleteModal();
      },
      onError: (error) => {
        enqueueSnackbar(`Deletion failed: ${error.message}`, { variant: 'error' });
        closeDeleteModal();
      },
    });
  };

  const handleEdit = (id: string) => {
    const pizza = pizzas.find((item) => item.id === id);
    if (!pizza) return;
    setSelectedPizza(pizza);
    setOpenModal(true);
  };

  const handleCreate = () => {
    setSelectedPizza(undefined);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedPizza(undefined);
  };

  const handleSearch = (value: string) => {
    const pizza = pizzas.find((item) => item.id === value);
    if (pizza) {
      setSelectedPizza(pizza);
      setOpenModal(true);
    } else {
      enqueueSnackbar('Pizza not found', { variant: 'error' });
    }
  };

  return (
    <React.Fragment>
      <CustomModal
        open={openModal}
        onClose={closeModal}
        title={selectedPizza ? 'Edit Pizza' : 'Create Pizza'}
      >
        <PizzaForm
          key={selectedPizza?.id ?? 'create'}
          submitLabel={selectedPizza ? 'Update' : 'Create'}
          pizza={selectedPizza}
          onSuccess={closeModal}
        />
      </CustomModal>

      <CustomModal
        open={openDeleteModal}
        onClose={closeDeleteModal}
        title="Delete Pizza"
      >
        <Typography variant="body1">Are you sure you want to delete this pizza?</Typography>
        <Button variant="contained" color="primary" onClick={() => handleDelete(selectedPizza?.id ?? '')} disabled={isDeletingPizza}>
          {isDeletingPizza ? <CircularProgress size={20} /> : 'Delete'}
        </Button>
      </CustomModal>
      {isAdmin && (
        <Stack sx={{gap: 2}}>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create New Pizza
          </Button>
          <SearchField onSearch={handleSearch} label="Search by Id" />
        </Stack>
      )}
      <CustomDataTable
        data={tableData}
        columns={pizzasTableColumns}
        onDelete={(id) => {
          setSelectedPizza(pizzas.find((item) => item.id === id));
          setOpenDeleteModal(true);
        }}
        onEdit={handleEdit}
        isDeleting={isDeletingPizza}
        showActions={isAdmin}
      />
    </React.Fragment>
  );
};
