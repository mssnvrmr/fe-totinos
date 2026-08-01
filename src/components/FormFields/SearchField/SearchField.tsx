import { IoSearchSharp } from "react-icons/io5";
import { Button, Stack } from "@mui/material";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

interface SearchFieldProps {
  onSearch: (value: string) => void;
  label?: string;
}

export const SearchField = ({ onSearch, label = 'Search' }: SearchFieldProps) => {
  const [search, setSearch] = useState('');

  return (
    <Stack direction="row" spacing={2}>
      <TextField
      label={label}
      slotProps={{
        input: {
          startAdornment: <InputAdornment position="start"><IoSearchSharp /></InputAdornment>,
        },
      }}
      size="small"
      fullWidth
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />
    <Button variant="contained" color="primary" onClick={() => onSearch(search)}>
      Search
    </Button>
    </Stack>
    
  );
};