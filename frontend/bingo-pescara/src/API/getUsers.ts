import axios from 'axios';
import type { User } from '../utils/types';

const getEvents = async (): Promise<User[]> => {
  try {
    const respose = await axios.get('http://localhost:3000/api/users');
    return respose.data;
  } catch (error) {
    console.error(error);
  }
  return [];
};

export default getEvents;
