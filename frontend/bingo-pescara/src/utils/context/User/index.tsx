import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserById from '../../../API/getUserById';
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

  const doLogin = useCallback(
    async (username: string, password: string) => {
      if (!username || !password) {
        return 'Il form non è completo';
      }
      const response = await getUserById(username);

      const userData: User = {
        _id: response._id ?? '',
        username: response.username,
        email: response.email,
        choices: response.choices ?? [],
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      navigate('/my-profile');
    },
    [navigate]
  );

  const doRegister = useCallback(
    async (username: string, email: string, password: string) => {
      if (!username || !email || !password) {
        return 'Il form non è completo';
      }

      try {
        type RegisterResponse = User & { message?: string };

        const response = await axios.post<RegisterResponse>('https://bingo-pescara.onrender.com/api/utenti', {
          username,
          email,
          // password,
        });

        if (response.data.message) {
          console.warn('Registrazione fallita:', response.data.message);
          return response.data.message;
        }

        const registerdUser = await getUserById(username);
        console.log('registerdUser', registerdUser);

        const userData: User = {
          _id: registerdUser._id,
          username: registerdUser.username,
          email: registerdUser.email,
          choices: registerdUser.choices,
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        navigate('/my-profile');
      } catch (error) {
        console.warn('Errore di rete', error);
        return 'Errore di rete, riprova più tardi';
      }
    },
    [navigate]
  );

  const MemorizedValue = useMemo(() => {
    const value: UserContext = {
      choices,
      setChoices,
      addChoice,
      openModal,
      closeModal,
      showModal,
      doLogin,
      doRegister,
      user,
      setUser,
    };
    return value;
  }, [addChoice, choices, closeModal, doLogin, doRegister, openModal, showModal, user]);

  return <Context.Provider value={MemorizedValue}>{children}</Context.Provider>;
};
