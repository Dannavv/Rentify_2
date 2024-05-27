// UserContext.js
"use client"
import { createContext, useContext, useState } from 'react';

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  let [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
