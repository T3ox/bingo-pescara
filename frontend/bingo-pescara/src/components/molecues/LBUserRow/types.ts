import type { BingoEvent } from '../../../utils/types';

export default interface Props {
  name: string;
  choices: BingoEvent[];
  rank: number;
}
