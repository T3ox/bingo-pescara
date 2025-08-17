import axios from 'axios';
import type { User } from '../utils/types';

const getEvents = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>('http://localhost:3000/api/users');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getEvents;
