import type { BingoEvent, User } from '../../types';

export default interface UserContext {
  choices: BingoEvent[];
  addChoice: (event: BingoEvent) => void;
  showModal: boolean;
  openModal: (id: number) => void;
  closeModal: () => void;
  doRegister: (username: string, email: string, password: string) => Promise<string>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
