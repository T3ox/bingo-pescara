import axios from 'axios';
import type { BingoEvent } from '../utils/types';

const getSavedEvents = async (username: string): Promise<BingoEvent[]> => {
  try {
    const response = await axios.get<BingoEvent[]>(`http://localhost:3000/api/event/${username}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getSavedEvents;
