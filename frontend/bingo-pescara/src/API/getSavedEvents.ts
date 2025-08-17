import axios from 'axios';
import type { BingoEvent } from '../utils/types';

const getSavedEvents = async (username: string): Promise<BingoEvent[]> => {
  try {
    const response = await axios.get<BingoEvent[]>(`http://192.168.1.175:3000/api/event/${username}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getSavedEvents;
