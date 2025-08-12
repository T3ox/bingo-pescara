import { useCallback, useMemo, useState } from 'react';
import type { BingoEvent } from '../../types';
import type Props from '../types';
import type UserContext from './types';
import Context from './UserContext';

export const UserProvider = ({ children }: Props) => {
  const [choices, setChoices] = useState<BingoEvent[]>([
    {
      value: 'Qualuno si caga addosso',
      rarity: 'UNCOMMON',
      index: 1,
    },
    {
      value: '',
      rarity: 'COMMON',
      index: 2,
    },
    {
      value: '',
      rarity: 'RARE',
      index: 3,
    },
    {
      value: '',
      rarity: 'EPIC',
      index: 4,
    },
    {
      value: '',
      rarity: 'LEGENDARY',
      index: 5,
    },
    {
      value: '',
      rarity: '',
      index: 6,
    },
  ]);

  const addChoice = useCallback((event: BingoEvent) => {
    console.log(event);
  }, []);

  const MemorizedValue = useMemo(() => {
    const value: UserContext = {
      choices,
      addChoice,
    };
    return value;
  }, [addChoice, choices]);

  return <Context.Provider value={MemorizedValue}>{children}</Context.Provider>;
};
