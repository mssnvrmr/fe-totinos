import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import { MdModeEdit } from 'react-icons/md';
import { FaTrashCan } from 'react-icons/fa6';
import { enqueueSnackbar } from 'notistack';
import { useDeleteIngredient, useGetIngredients } from '../../api/ingredients';
import { ingredientsTableColumns } from '../../constants/ingredients-table';
import { UserRolesEnum } from '../../constants/user-roles';
import { CustomModal } from '../CustomModal/CustomModal';
import { CreateIngredient } from '../IngredientForm/IngredientForm';
import { useAuth } from '../Auth/AuthContext';
import type { Ingredient } from '../../interfaces/Ingredient';

export const IngredientsTable = () => {
  const { data: ingredients } = useGetIngredients();
  const [openModal, setOpenModal] = useState(false);
  const { role } = useAuth();
  const isAdmin = role === UserRolesEnum.ADMIN;

  const columns = ingredientsTableColumns.filter(
    (column) => column.id !== 'actions' || isAdmin,
  );

  const { mutate: deleteIngredient, isPending: isDeletingIngredient } = useDeleteIngredient();

  const handleDelete = (id: string) => {
    deleteIngredient(id, {
      onSuccess: () => {
        enqueueSnackbar('Ingredient deleted successfully', { variant: 'success' });
      },
      onError: (error) => {
        enqueueSnackbar(`Deletion failed: ${error.message}`, { variant: 'error' });
      },
    });
  };

  const handleEdit = (id: string) => {
    setOpenModal(true);
    console.log(id);
  };

  const renderCell = (ingredient: Ingredient, columnId: (typeof columns)[number]['id']) => {
    if (columnId === 'actions') {
      return (
        <Stack direction="row" sx={{ width: '100%', justifyContent: 'center', gap: 2 }}>
          <IconButton color="secondary" onClick={() => handleEdit(ingredient.id)}>
            <MdModeEdit />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(ingredient.id)}
            disabled={isDeletingIngredient}
          >
            <FaTrashCan />
          </IconButton>
        </Stack>
      );
    }

    return ingredient[columnId];
  };

  return (
    <React.Fragment>
      <CustomModal open={openModal} onClose={() => setOpenModal(false)} title="Create Ingredient">
        <CreateIngredient submitLabel="Create" onSuccess={() => setOpenModal(false)} />
      </CustomModal>
      {isAdmin && (
        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
          Create New Ingredient
        </Button>
      )}
      <TableContainer component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Table sx={{ width: { xs: '100%', sm: '60%', md: '40%' } }} size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients?.map((ingredient) => (
              <TableRow key={ingredient.id}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {renderCell(ingredient, column.id)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};
