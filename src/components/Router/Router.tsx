import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { Home } from '../../pages/Home/Home';
import { LogIn } from '../../pages/LogIn/LogIn';
import { SignUp } from '../../pages/SignUp/SignUp';
import { Orders } from '../../pages/Orders/Orders';
import { Menu } from '../../pages/Menu/Menu';
import { Ingredients } from '../../pages/Ingredients/Ingredients';
import { Users } from '../../pages/Users/Users';
import PrivateRoute from './PrivateRoute';
import { useAuth } from '../Auth/AuthContext';

export const Router = () => {
  const { isAuthenticated } = useAuth(); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOG_IN} element={<LogIn />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTES.ORDERS} element={<Orders />} />
        <Route element={<PrivateRoute isLoggedIn={isAuthenticated} />}>
          <Route path={ROUTES.MENU} element={<Menu />} />
          <Route path={ROUTES.INGREDIENTS} element={<Ingredients />} />
          <Route path={ROUTES.USERS} element={<Users />} />
        </Route>
        <Route path="*" element={<Navigate replace to={ROUTES.HOME} />} />
      </Routes>
    </BrowserRouter >
  )
}

