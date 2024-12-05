import React from 'react';
import { useAuth } from '../hooks/useAuth';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  console.log(user)
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Your role is: {user?.role}</p>
      <p>Balance: {user?.balance}</p>
      <p>Bonas: {user?.referralBonus}</p>
      <p>Reffer: {user?.referralCode}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

