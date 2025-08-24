import axios from 'axios';
import type { MockUser, User } from '../utils/types';
import usersMock from '../utils/usersMock';

const USE_MOCK = true;

const getEvents = async (): Promise<MockUser[]> => {
  if (USE_MOCK) {
    // ritorna i dati mockati senza fare chiamata HTTP
    return usersMock;
  }

  try {
    // backend reale
    const response = await axios.get<User[]>(
      'https://bingo-pescara.onrender.com/api/users'
      // oppure "http://localhost:3000/api/users"
    );
    //return response.data;
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getEvents;
