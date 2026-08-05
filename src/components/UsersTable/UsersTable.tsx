import React, { useState } from 'react';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useDeleteUser, useGetUsers } from '../../api/users';
import { usersTableColumns } from '../../constants/users-table';
import { UserRolesEnum } from '../../constants/user-roles';
import { CustomModal } from '../CustomModal/CustomModal';
import { UserForm } from '../UserForm/UserForm';
import { CustomDataTable } from '../CustomDataTable/CustomDataTable';
import { useAuth } from '../Auth/AuthContext';
import type { User } from '../../interfaces/User';
import { SearchField } from '../FormFields/SearchField/SearchField';

export const UsersTable = () => {
  const { role, isAuthenticated } = useAuth();
  const isAdmin = role === UserRolesEnum.ADMIN;
  const { data: users = [] } = useGetUsers(isAuthenticated && isAdmin);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const { mutate: deleteUser, isPending: isDeletingUser } = useDeleteUser();

  const closeModal = () => {
    setOpenModal(false);
    setSelectedUser(undefined);
  };

  const handleDelete = (id: string) => {
    deleteUser(id, {
      onSuccess: () => {
        enqueueSnackbar('User deleted successfully', { variant: 'success' });
        closeDeleteModal();
      },
      onError: (error) => {
        enqueueSnackbar(`Deletion failed: ${error.message}`, { variant: 'error' });
        closeDeleteModal();
      },
    });
  };

  const handleEdit = (id: string) => {
    const user = users.find((item) => item.id === id);
    if (!user) return;
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCreate = () => {
    setSelectedUser(undefined);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedUser(undefined);
  };

  const handleSearch = (value: string) => {
    const user = users.find((item) => item.email.toLowerCase() === value.toLowerCase());
    if (!user) return enqueueSnackbar('User not found', { variant: 'error' });
    setSelectedUser(user);
    setOpenModal(true);
  };

  return (
    <React.Fragment>
      <CustomModal
        open={openModal}
        onClose={closeModal}
        title={selectedUser ? 'Edit User' : 'Create User'}
      >
        <UserForm
          key={selectedUser?.id ?? 'create'}
          submitLabel={selectedUser ? 'Update' : 'Create'}
          user={selectedUser}
          onSuccess={closeModal}
        />
      </CustomModal>

      <CustomModal
        open={openDeleteModal}
        onClose={closeDeleteModal}
        title="Delete User"
      >
        <Typography variant="body1">Are you sure you want to delete this user?</Typography>
        <Button variant="contained" color="primary" onClick={() => handleDelete(selectedUser?.id ?? '')} disabled={isDeletingUser}>
          {isDeletingUser ? <CircularProgress size={20} /> : 'Delete'}
        </Button>
      </CustomModal>
      {isAdmin && (
        <Stack sx={{gap: 2}}>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create New User
          </Button>
          <SearchField onSearch={handleSearch} label="Search by E-mail" />
        </Stack>
      )}
      <CustomDataTable
        data={users}
        columns={usersTableColumns}
        onDelete={(id) => {
          setSelectedUser(users.find((item) => item.id === id));
          setOpenDeleteModal(true);
        }}
        onEdit={handleEdit}
        isDeleting={isDeletingUser}
        showActions={isAdmin}
      />
    </React.Fragment>
  );
};
