export interface BingoEvent {
  _id: string;
  index: number;
  value: string;
  rarity: string;
  occurred: boolean;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  choices: BingoEvent[];
}
