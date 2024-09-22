import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const PrivateRoute: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Check if the user is authenticated, either by token in Redux or localStorage
  console.log("user ",user);
  const isAuthenticated = user?.token || localStorage.getItem('token');

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
