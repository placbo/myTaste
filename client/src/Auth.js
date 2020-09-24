import React, { useEffect, useState } from 'react';
import app from './firebase.js';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if (process.env.REACT_APP_USE_MOCK === 'true') {
      setCurrentUser({ email: 'perbjester@gmail.com' });
      setPending(false);
      setIsAdmin(true);
    } else {
      app.auth().onAuthStateChanged((user) => {
        setIsAdmin(user && (user.email === 'perbjester@gmail.com' || user.email === 'nraanes2@gmail.com'));
        setCurrentUser(user);
        setPending(false);
      });
    }
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
