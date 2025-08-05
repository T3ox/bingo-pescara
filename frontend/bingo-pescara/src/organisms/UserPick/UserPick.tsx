import { useEffect, useState } from 'react';
import Pick from '../../molecues/Pick/Pick';
import type { BingoEvent } from '../../utils/types';
import './styles.scss';

const UserPick = () => {
  const [data, setdata] = useState<BingoEvent[]>([]);

  useEffect(() => {
    // API CALL POPOLATE?
    setdata([
      {
        value: 'Qualuno si caga addosso',
        rarity: 'UNCOMMON',
      },
      {
        value: '',
        rarity: 'COMMON',
      },
      {
        value: '',
        rarity: 'RARE',
      },
      {
        value: '',
        rarity: 'EPIC',
      },
      {
        value: '',
        rarity: 'LEGENDARY',
      },
      {
        value: '',
        rarity: '',
      },
    ]);
  }, []);

  return (
    <div className="user-pick-container">
      <div className="title-section d-flex justify-content-center align-items-center">
        <span>IL TUO BINGO</span>
      </div>
      <h2>Scheda eventi</h2>
      <div className="picks-container">
        {data.map((p, index) => (
          <Pick data={p} key={index} />
        ))}
      </div>
    </div>
  );
};

export default UserPick;
