import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('sucre_admin_token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    const savedAdmin = localStorage.getItem('sucre_admin_user');
    if (savedAdmin && token) {
      try {
        setAdmin(JSON.parse(savedAdmin));
        setIsAuthenticated(true);
      } catch (e) {
        logout();
      }
    }
  }, [token]);

  const loginAdmin = (tokenData, adminData) => {
    localStorage.setItem('sucre_admin_token', tokenData);
    localStorage.setItem('sucre_admin_user', JSON.stringify(adminData));
    setToken(tokenData);
    setAdmin(adminData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('sucre_admin_token');
    localStorage.removeItem('sucre_admin_user');
    setToken(null);
    setAdmin(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ admin, token, isAuthenticated, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
