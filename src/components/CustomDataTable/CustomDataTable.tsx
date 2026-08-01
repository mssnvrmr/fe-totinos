import type { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  IconButton,
  Paper,
} from '@mui/material';
import { MdModeEdit } from 'react-icons/md';
import { FaTrashCan } from 'react-icons/fa6';

export type DataTableColumn<TField extends string = string> = {
  id: TField;
  label: string;
  align?: 'left' | 'center' | 'right' | 'inherit' | 'justify';
};

type Identifiable = {
  id: string;
};

type DataField<T> = Exclude<keyof T, 'id'> & string;

type CustomDataTableProps<T extends Identifiable> = {
  data: T[];
  columns: DataTableColumn<DataField<T> | 'actions'>[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  isDeleting?: boolean;
  showActions?: boolean;
};

export const CustomDataTable = <T extends Identifiable>({
  data,
  columns,
  onDelete,
  onEdit,
  isDeleting = false,
  showActions = true,
}: CustomDataTableProps<T>) => {
  const visibleColumns = columns.filter(
    (column) => column.id !== 'actions' || showActions,
  );

  const renderCell = (
    row: T,
    columnId: DataField<T> | 'actions',
  ): ReactNode => {
    if (columnId === 'actions') {
      return (
        <Stack direction="row" sx={{ width: '100%', justifyContent: 'center', gap: 2 }}>
          {onEdit && (
            <IconButton color="secondary" onClick={() => onEdit(row.id)}>
              <MdModeEdit />
            </IconButton>
          )}
          {onDelete && (
            <IconButton
              color="secondary"
              onClick={() => onDelete(row.id)}
              disabled={isDeleting}
            >
              <FaTrashCan />
            </IconButton>
          )}
        </Stack>
      );
    }
    if (columnId === 'price') {
      return <>{ `$${(row[columnId] as number).toFixed(2)}` }</>;
    }
    if (columnId === 'stock') {
      return <>{ `${(row[columnId] as number).toFixed(2)} gms` }</>;
    }
    const value = row[columnId];
    if (Array.isArray(value)) {
      return <>{value.join(', ')}</>;
    }
    return value as ReactNode;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ display: 'flex', justifyContent: 'center', width: { xs: '100%', sm: '60%', md: '40%' } }}
    >
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            {visibleColumns.map((column) => (
              <TableCell key={column.id} align={column.align ?? 'center'}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {visibleColumns.map((column) => (
                <TableCell key={column.id} align={column.align ?? 'center'}>
                  {renderCell(row, column.id)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
