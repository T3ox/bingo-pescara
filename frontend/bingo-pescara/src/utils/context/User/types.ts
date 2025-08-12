import type { BingoEvent } from '../../types';

export default interface UserContext {
  choices: BingoEvent[];
  addChoice: (event: BingoEvent) => void;
  showModal: boolean;
  openModal: (id: number) => void;
  closeModal: () => void;
}
