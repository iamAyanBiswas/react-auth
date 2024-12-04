import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Your role is: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

