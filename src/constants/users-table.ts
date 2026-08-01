import type { User } from '../interfaces/User';
import type { DataTableColumn } from '../components/CustomDataTable/CustomDataTable';

type UserField = Exclude<keyof User, 'id'>;

export const usersTableColumns: DataTableColumn<UserField | 'actions'>[] = [
  {
    id: 'username',
    label: 'Username',
    align: 'center',
  },
  {
    id: 'phone',
    label: 'Phone',
    align: 'center',
  },
  {
    id: 'email',
    label: 'Email',
    align: 'center',
  },
  {
    id: 'role',
    label: 'Role',
    align: 'center',
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'center',
  },
];
