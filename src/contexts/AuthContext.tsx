import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  balance:number;
  phone:number;
  referralCode:number;
  referralBonus:number;
  claimReferralBonus:number;
  role: 'user' | 'admin';
}



interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (phone: number, password: string) => Promise<void>;
  register: (phone: number, password: string) => Promise<void>;
  logout: () => void;
  vefifyAuth: () => Promise<void>;

}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    storedAccessToken && setAccessToken(storedAccessToken) ;
    storedRefreshToken && setRefreshToken(storedRefreshToken) ;
  }, []);



  const login = async (phone: number, password: string) => {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const res = await response.json();

    setAccessToken(res?.data?.accessToken);
    setRefreshToken(res?.data?.refreshToken);
    localStorage.setItem('accessToken', res?.data?.accessToken);
    localStorage.setItem('refreshToken', res?.data?.refreshToken);
  };

  const register = async (phone: number, password: string) => {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const res = await response.json();

    setAccessToken(res?.data?.accessToken);
    setRefreshToken(res?.data?.refreshToken);
    localStorage.setItem('accessToken', res?.data?.accessToken);
    localStorage.setItem('refreshToken', res?.data?.refreshToken);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  const vefifyAuth = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken},${refreshToken}`
        }
      });

      const res = await response.json();
      res?.data?.accessToken && localStorage.setItem('accessToken', res.data.accessToken)
      res?.data?.refreshToken && localStorage.setItem('refreshToken', res.data.refreshToken)
      
      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      else if (res?.data?.message === "Refresh Token sucessfull") { 
        vefifyAuth() 
      }
     else {
      setUser(res?.data)
    }
    } catch (error) {
      console.error('Error refreshing authentication:', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, register, logout, vefifyAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

