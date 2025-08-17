import axios from 'axios';
import type { User } from '../utils/types';

const getUserById = async (username: string): Promise<User> => {
  try {
    const response = await axios.get<User>(`http://192.168.1.175:3000/api/utenti/${username}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserById;
