import { useEffect, useState } from 'react';
import getUsers from '../../../API/getUsers';
import type { BingoEvent, User } from '../../../utils/types';
import LBUserRow from '../../molecues/LBUserRow/LBUserRow';
import './styles.scss';

const calculatePoints = (choices: BingoEvent[]) => {
  const rarityPoints: Record<string, number> = {
    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    legendary: 5,
  };

  return choices.reduce((total, c) => {
    if (c.occurred) {
      return total + (rarityPoints[c.rarity.toLowerCase()] || 0);
    }
    return total;
  }, 0);
};

interface LBUser extends User {
  rank: number;
}

const Leaderboard = () => {
  const [users, setUsers] = useState<LBUser[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data: User[] = await getUsers();

      // ordina per punti decrescenti
      const sorted = [...data].sort(
        (a, b) => calculatePoints(b.choices) - calculatePoints(a.choices)
      );

      // calcola i rank considerando i punti uguali
      let lastPoints = -1;
      let lastRank = 0;

      const ranked = sorted.map((user, index) => {
        const points = calculatePoints(user.choices);
        let rank = index + 1;

        if (points === lastPoints) {
          rank = lastRank; // stesso punteggio = stesso rank
        } else {
          lastRank = rank;
          lastPoints = points;
        }

        return { ...user, rank };
      });

      setUsers(ranked);
    };

    getData();
  }, []);

  return (
    <div className="leaderboard">
      {users.map((user) => (
        <LBUserRow rank={user.rank} name={user.username} choices={user.choices} key={user._id} />
      ))}
    </div>
  );
};

export default Leaderboard;
