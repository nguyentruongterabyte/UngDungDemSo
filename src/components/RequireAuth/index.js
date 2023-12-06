import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import config from '~/config';
import useAuth from '~/hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

  const roles = decoded?.userInfo?.roles || [];

  return roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? ( //changed from user to accessToken to persist login after refresh
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to={config.routes.login} state={{ from: location }} replace />
  );
};

export default RequireAuth;
