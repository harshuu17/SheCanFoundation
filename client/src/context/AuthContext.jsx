import { createContext, useContext, useState, useEffect } from 'react';
import { getAdminProfile } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('shecan_token');
    if (token) {
      getAdminProfile()
        .then(({ data }) => setUser(data.user))
        .catch(() => localStorage.removeItem('shecan_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('shecan_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('shecan_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
