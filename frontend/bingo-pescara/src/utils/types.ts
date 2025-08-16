export interface BingoEvent {
  _id: string;
  index: number;
  value: string;
  rarity: string;
  occured: boolean;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  choices: BingoEvent[];
}
