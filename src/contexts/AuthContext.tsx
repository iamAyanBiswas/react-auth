import React, { createContext, useState, ReactNode } from 'react';

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
  login: (phone: string, password: string) => Promise<void>;
  logout: () => void;
  vefifyAuth: () => Promise<void>;

}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);






  const login = async (phone: string, password: string) => {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const res = await response.json();

   
    localStorage.setItem('accessToken', res?.data?.accessToken);
    localStorage.setItem('refreshToken', res?.data?.refreshToken);
  };


  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);

  };

  const vefifyAuth = async () => {
    const accessToken= localStorage.getItem('accessToken')
    const refreshToken= localStorage.getItem('refreshToken')

    if(!accessToken || !refreshToken) alert("Where is token")
    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
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
        await vefifyAuth() 
      }
     else {
      res.data.role='user';
      setUser(res?.data)
    }
    } catch (error) {
      console.error('Error in authentication:', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, vefifyAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

