import { createContext, useContext } from 'react';
import type UserContextType from './types';

const Context = createContext<UserContextType>({
  choices: [],
  addChoice: () => {},
});

export const useUser = (): UserContextType => useContext(Context);

export default Context;
