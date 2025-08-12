import type { BingoEvent } from '../../types';

export default interface UserContext {
  choices: BingoEvent[];
  addChoice: (event: BingoEvent) => void;
}
