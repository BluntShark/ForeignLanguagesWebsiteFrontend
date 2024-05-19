import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated }) => {
  const auth = isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';
  return auth ? element : <Navigate to="/login" />;
};

export default PrivateRoute;