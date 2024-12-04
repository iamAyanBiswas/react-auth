import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });
  
      const res = await response.json();
  
      if (!response.ok) {
        throw new Error("Register failed")
      }
      localStorage.setItem('accessToken', res?.data?.accessToken);
      localStorage.setItem('refreshToken', res?.data?.refreshToken);
      navigate('/dashboard')

    } catch (__error:unknown) {
      console.error(__error)
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone((e.target.value))}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

