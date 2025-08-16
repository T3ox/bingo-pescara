import axios from 'axios';
import type BingoEvent from '../utils/types';

const getEvents = async (): Promise<BingoEvent[]> => {
  try {
    const respose = await axios.get('http://localhost:3000/api/events');
    return respose.data;
  } catch (error) {
    console.error(error);
  }
  return [];
};

export default getEvents;
