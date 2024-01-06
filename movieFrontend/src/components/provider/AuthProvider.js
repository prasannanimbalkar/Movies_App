import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuth(JSON.parse(storedUser));
    }
  }, []);

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setAuth(user);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
