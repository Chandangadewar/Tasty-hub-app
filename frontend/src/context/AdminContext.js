import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/admin/check-auth', { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          setIsAdmin(true);
          setAdminUser(res.data.username);
        }
      })
      .catch(() => setIsAdmin(false))
      .finally(() => setLoading(false));
  }, []);

  const login = (username) => {
    setIsAdmin(true);
    setAdminUser(username);
  };

  const logout = async () => {
    await axios.post('/api/admin/logout', {}, { withCredentials: true });
    setIsAdmin(false);
    setAdminUser('');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminUser, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);