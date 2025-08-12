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
  const [showModal, setShowModal] = useState(false);
  const [clickedItem, setClickedItem] = useState(0);

  const addChoice = useCallback(
    (event: BingoEvent) => {
      console.log(event);
      setChoices((prevChoices) =>
        prevChoices.map((choice) => (choice.index === clickedItem ? event : choice))
      );
      setShowModal(false);
    },
    [clickedItem]
  );

  const openModal = useCallback((id: number) => {
    setClickedItem(id);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const MemorizedValue = useMemo(() => {
    const value: UserContext = {
      choices,
      addChoice,
      openModal,
      closeModal,
      showModal,
    };
    return value;
  }, [addChoice, choices, closeModal, openModal, showModal]);

  return <Context.Provider value={MemorizedValue}>{children}</Context.Provider>;
};
