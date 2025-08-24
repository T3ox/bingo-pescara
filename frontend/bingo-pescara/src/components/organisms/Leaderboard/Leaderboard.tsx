import { useEffect, useState } from 'react';
import getUsers from '../../../API/getUsers';
import type { BingoEvent, MockUser } from '../../../utils/types';
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
    if (c.occured) {
      return total + (rarityPoints[c.rarity.toLowerCase()] || 0);
    }
    return total;
  }, 0);
};

const Leaderboard = () => {
  const [users, setUsers] = useState<MockUser[]>([]);
  const [choices, setChoices] = useState<BingoEvent[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data: MockUser[] = await getUsers();
      const sorted = [...data].sort(
        (a, b) => calculatePoints(b.choices) - calculatePoints(a.choices)
      );

      setUsers(sorted);
      console.log('users', sorted);
    };

    getData();
  }, [choices]);

  return (
    <div className="leaderboard">
      {users.map((user, index) => (
        <LBUserRow rank={index + 1} name={user.username} choices={user.choices} key={user._id} />
      ))}
    </div>
  );
};

export default Leaderboard;
