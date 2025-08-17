import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type BingoEvent, type User } from '../../types';
import type Props from '../types';
import type UserContext from './types';
import Context from './UserContext';

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [choices, setChoices] = useState<BingoEvent[]>([
    {
      value: '',
      rarity: 'UNCOMMON',
      index: 1,
      _id: '',
      occured: false,
    },
    {
      value: '',
      rarity: 'COMMON',
      index: 2,
      _id: '',
      occured: false,
    },
    {
      value: '',
      rarity: 'RARE',
      index: 3,
      _id: '',
      occured: false,
    },
    {
      value: '',
      rarity: 'EPIC',
      index: 4,
      _id: '',
      occured: false,
    },
    {
      value: '',
      rarity: 'LEGENDARY',
      index: 5,
      _id: '',
      occured: false,
    },
    {
      value: '',
      rarity: '',
      index: 6,
      _id: '',
      occured: false,
    },
    {
      value: '',
      rarity: '',
      index: 7,
      _id: '',
      occured: false,
    },
    {
      value: '',
      rarity: '',
      index: 8,
      _id: '',
      occured: false,
    },
    {
      value: '',
      rarity: '',
      index: 9,
      _id: '',
      occured: false,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [clickedItem, setClickedItem] = useState(0);
  const [user, setUser] = useState<User>({ _id: '', email: '', username: '', choices: [] });

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

  const doRegister = useCallback(
    async (username: string, email: string, password: string) => {
      if (!username || !email || !password) {
        return 'Il form non è completo';
      }

      try {
        const response = await axios.post('http://localhost:3000/api/utenti', {
          username,
          email,
          // password, <-- se decidi di gestirla
        });

        if (response.data.message) {
          console.warn('Registrazione fallita:', response.data.message);
          return response.data.message;
        }
        const userData = { username, email, _id: '', choices: [] };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        navigate('/my-profile');
      } catch (error) {
        console.warn('Errore di rete', error);
        return 'Errore di rete, riprova più tardi';
      }
    },
    [navigate] // dipendenze
  );

  const MemorizedValue = useMemo(() => {
    const value: UserContext = {
      choices,
      addChoice,
      openModal,
      closeModal,
      showModal,
      doRegister,
      user,
      setUser
    };
    return value;
  }, [addChoice, choices, closeModal, doRegister, openModal, showModal, user]);

  return <Context.Provider value={MemorizedValue}>{children}</Context.Provider>;
};
