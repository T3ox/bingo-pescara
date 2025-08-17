import type { BingoEvent, User } from '../../types';

export default interface UserContext {
  choices: BingoEvent[];
  setChoices: React.Dispatch<React.SetStateAction<BingoEvent[]>>;
  addChoice: (event: BingoEvent) => void;
  showModal: boolean;
  openModal: (id: number) => void;
  closeModal: () => void;
  doLogin: (username: string, password: string) => Promise<string | undefined>;
  doRegister: (username: string, email: string, password: string) => Promise<string | undefined>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
