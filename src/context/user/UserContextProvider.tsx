import React, { useMemo, createContext } from 'react';
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
    name: 'unknown user',
  });

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
