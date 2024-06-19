'use client';
import React, { createContext, useState, useEffect } from 'react';

interface UserContextProps {
  userInitial: string | null;
  setUserInitial: (initial: string | null) => void;
}

export const UserContext = createContext<UserContextProps>({
  userInitial: null,
  setUserInitial: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInitial, setUserInitial] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userDetails = JSON.parse(user);
      setUserInitial(userDetails.firstName.charAt(0).toUpperCase());
    }
  }, []);

  return (
    <UserContext.Provider value={{ userInitial, setUserInitial }}>
      {children}
    </UserContext.Provider>
  );
};
