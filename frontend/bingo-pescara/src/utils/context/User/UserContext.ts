import { createContext, useContext } from 'react';
import type UserContextType from './types';

const Context = createContext<UserContextType>({
  choices: [],
  addChoice: () => {},
  showModal: false,
  openModal: () => {},
  closeModal: () => {},
});

export const useUser = (): UserContextType => useContext(Context);

export default Context;
