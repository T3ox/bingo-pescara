import axios from 'axios';
import type { User } from '../utils/types';

const getUserById = async (username: string): Promise<User> => {
  console.log(username);

  try {
    const response = await axios.get<User>(`http://192.168.1.175:3000/api/utenti/${username}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserById;
