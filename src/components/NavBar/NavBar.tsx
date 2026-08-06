import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { GiFullPizza } from 'react-icons/gi';
import { ROUTES } from '../../config/routes';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/useAuth';

export const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout, userName } = useAuth();
  const handleLogout = async () => {
    await logout().then(() => {
      navigate(ROUTES.HOME);
    });
  };
  const pages = [
    ...(isAuthenticated ? [{ name: 'Orders', path: ROUTES.ORDERS }] : []),
    { name: 'Menu', path: ROUTES.MENU },
    ...(isAuthenticated && isAdmin ? [{ name: 'Ingredients', path: ROUTES.INGREDIENTS }] : []),
    ...(isAuthenticated && isAdmin ? [{ name: 'Users', path: ROUTES.USERS }] : []),
    ...(isAuthenticated ? [{ name: 'Profile', path: ROUTES.PROFILE }] : [])
  ];
  const authPages = [
    { name: 'Log In', path: ROUTES.LOG_IN },
    { name: 'Sign Up', path: ROUTES.SIGN_UP }
  ];
  const logoutPage = { name: 'Log Out', onClick: handleLogout };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="primary" sx={{ color: 'white' }} size="large" edge="start" onClick={() => navigate(ROUTES.HOME)}
          >
            <GiFullPizza />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Totino's Pizza
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {pages.map((page) => (
            <Button
              key={page.name}
              onClick={() => navigate(page.path)}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page.name}
            </Button>
          ))}
        </Box>
        {isAuthenticated ? (
          <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography component="span" variant="body2">Welcome,</Typography>
              <Typography component="span" variant="body2" color="primary">{userName}</Typography>
            </Box>
            <Button onClick={logoutPage.onClick} sx={{ color: 'white' }}>
              {logoutPage.name}
            </Button>
          </Stack>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {authPages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.path)}
                sx={{ color: 'white' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
