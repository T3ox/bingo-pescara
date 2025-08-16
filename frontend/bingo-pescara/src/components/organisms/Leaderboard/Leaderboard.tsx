import { useState } from 'react';
import type { User } from '../../../utils/types';
import LBUserRow from '../../molecues/LBUserRow/LBUserRow';
import './styles.scss';

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>([
    {
      _id: 0,
      username: '',
      email: '',
    },
    {
      _id: 0,
      username: '',
      email: '',
    },
  ]);

  

  return (
    <div className="leaderboard">
      {users.map((user) => (
        <>
          <LBUserRow name={user.username} choices={[]} pts={0} />
        </>
      ))}
    </div>
  );
};

export default Leaderboard;
