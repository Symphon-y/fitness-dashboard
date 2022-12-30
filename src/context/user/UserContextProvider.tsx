import React, { useMemo, createContext, useEffect } from 'react';
import { useContext } from 'react';
import { User } from '../../types/commonTypes';

interface UserContextState {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextState>({
  user: {} as User,
  setUser: () => {},
});

export interface UserContextProviderProps {
  children: JSX.Element;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = React.useState({
    id: '0',
    username: 'unknown user',
  });
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
