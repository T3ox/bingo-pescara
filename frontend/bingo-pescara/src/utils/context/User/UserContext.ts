import { createContext, useContext } from 'react';
import type UserContextType from './types';

const Context = createContext<UserContextType>({
  choices: [],
  addChoice: () => {},
  showModal: false,
  openModal: () => {},
  closeModal: () => {},
  doLogin: async (username: string, password: string): Promise<string> => {
    return `${username}, ${password}`;
  },
  doRegister: async (username: string, email: string, password: string): Promise<string> => {
    return `${username}, ${email}, ${password}`;
  },
  user: {
    _id: '',
    username: '',
    email: '',
    choices: [],
  },
  setUser: () => {},
});

export const useUser = (): UserContextType => useContext(Context);

export default Context;
