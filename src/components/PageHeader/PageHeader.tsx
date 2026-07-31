import { Icon } from '@mui/material';
import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
  icon: React.ReactNode;
}

export const PageHeader = ({ title, icon }: PageHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Icon color="primary" sx={{ fontSize: 30 }}>
        {icon}
      </Icon>
      <Typography variant="h4">
        {title}
      </Typography>
    </Box>
  );
};