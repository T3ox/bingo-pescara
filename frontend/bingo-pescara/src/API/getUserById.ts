import axios from 'axios';
import type { BingoEvent, User } from '../utils/types';
import userMock from '../utils/userMock';

const USE_MOCK = true;

interface MockUser {
  _id: string;
  username: string;
  email: string;
  choices: BingoEvent[];
}

const getUserById = async (username: string): Promise<MockUser> => {
  if (USE_MOCK) {
    // ritorna i dati mockati senza fare chiamata HTTP
    return userMock;
  }

  try {
    const response = await axios.get<User>(
      `https://bingo-pescara.onrender.com/api/utenti/${username}`
    );
    // return response.data;
    return {
      _id: '',
      username: '',
      email: '',
      choices: [
        {
          _id: '',
          index: 0,
          value: '',
          rarity: '',
          occured: false,
        },
      ],
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserById;
