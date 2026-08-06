import React, { useState } from 'react';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useDeleteIngredient, useGetIngredients } from '../../api/ingredients';
import { ingredientsTableColumns } from '../../constants/ingredients-table';
import { UserRolesEnum } from '../../constants/user-roles';
import { CustomModal } from '../CustomModal/CustomModal';
import { IngredientForm } from '../IngredientForm/IngredientForm';
import { CustomDataTable } from '../CustomDataTable/CustomDataTable';
import { useAuth } from '../Auth/useAuth';
import type { Ingredient } from '../../interfaces/Ingredient';
import { SearchField } from '../FormFields/SearchField/SearchField';

export const IngredientsTable = () => {
  const { data: ingredients = [] } = useGetIngredients();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | undefined>();
  const { role } = useAuth();
  const isAdmin = role === UserRolesEnum.ADMIN;

  const { mutate: deleteIngredient, isPending: isDeletingIngredient } = useDeleteIngredient();

  const closeModal = () => {
    setOpenModal(false);
    setSelectedIngredient(undefined);
  };

  const handleDelete = (id: string) => {
    deleteIngredient(id, {
      onSuccess: () => {
        enqueueSnackbar('Ingredient deleted successfully', { variant: 'success' });
        closeDeleteModal();
      },
      onError: (error) => {
        enqueueSnackbar(`Deletion failed: ${error.message}`, { variant: 'error' });
        closeDeleteModal();
      },
    });
  };

  const handleEdit = (id: string) => {
    const ingredient = ingredients.find((item) => item.id === id);
    if (!ingredient) return;
    setSelectedIngredient(ingredient);
    setOpenModal(true);
  };

  const handleCreate = () => {
    setSelectedIngredient(undefined);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedIngredient(undefined);
  };

  const handleSearch = (value: string) => {
    const ingredient = ingredients.find((item) => item.id.toLowerCase() === value.toLowerCase());
    if (!ingredient) return enqueueSnackbar('Ingredient not found', { variant: 'error' });
    setSelectedIngredient(ingredient);
    setOpenModal(true);
  };

  return (
    <React.Fragment>
      <CustomModal
        open={openModal}
        onClose={closeModal}
        title={selectedIngredient ? 'Edit Ingredient' : 'Create Ingredient'}
      >
        <IngredientForm
          key={selectedIngredient?.id ?? 'create'}
          submitLabel={selectedIngredient ? 'Update' : 'Create'}
          ingredient={selectedIngredient}
          onSuccess={closeModal}
        />
      </CustomModal>

      <CustomModal
        open={openDeleteModal}
        onClose={closeDeleteModal}
        title="Delete Ingredient"
      >
        <Typography variant="body1">Are you sure you want to delete this ingredient?</Typography>
        <Button variant="contained" color="primary" onClick={() => handleDelete(selectedIngredient?.id ?? '')} disabled={isDeletingIngredient}>
          {isDeletingIngredient ? <CircularProgress size={20} /> : 'Delete'}
        </Button>
      </CustomModal>
      {isAdmin && (
        <Stack sx={{gap: 2}}>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create New Ingredient
          </Button>
          <SearchField onSearch={handleSearch} label="Search by Id" />
        </Stack>
      )}
      <CustomDataTable
        data={ingredients}
        columns={ingredientsTableColumns}
        onDelete={(id) => {
          setSelectedIngredient(ingredients.find((item) => item.id === id));
          setOpenDeleteModal(true);
        }}
        onEdit={handleEdit}
        isDeleting={isDeletingIngredient}
        showActions={isAdmin}
      />
    </React.Fragment>
  );
};
