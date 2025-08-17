import axios from 'axios';
import type { BingoEvent } from '../utils/types';

const getSavedEvents = async (username: string): Promise<BingoEvent[]> => {
  try {
    const response = await axios.get<BingoEvent[]>(
      `https://bingo-pescara.onrender.com/api/event/${username}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getSavedEvents;
