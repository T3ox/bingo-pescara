import axios from 'axios';
import type { BingoEvent } from '../utils/types';

const getEvents = async (): Promise<BingoEvent[]> => {
  try {
    const response = await axios.get<BingoEvent[]>('https://bingo-pescara.onrender.com/api/events');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getEvents;
