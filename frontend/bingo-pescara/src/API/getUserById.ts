import axios from 'axios';
import type { User } from '../utils/types';

const getUserById = async (username: string): Promise<User> => {
  try {
    const response = await axios.get<User>(
      `https://bingo-pescara.onrender.com/api/utenti/${username}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserById;
