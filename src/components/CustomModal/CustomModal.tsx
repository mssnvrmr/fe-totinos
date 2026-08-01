import { Stack, Modal, IconButton, Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', sm: '50%', md: '30%' },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  gap: 4,
};

export const CustomModal = ({ open, onClose, children, title }: CustomModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Stack sx={{ ...style }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{title}</Typography>
          <IconButton onClick={onClose}>
            <IoClose />
          </IconButton>
        </Stack>
        {children}
      </Stack>
    </Modal>
  );
};