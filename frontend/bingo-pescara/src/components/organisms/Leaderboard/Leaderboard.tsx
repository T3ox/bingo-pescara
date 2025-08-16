import { useEffect, useState } from 'react';
import getUsers from '../../../API/getUsers';
import type { User } from '../../../utils/types';
import LBUserRow from '../../molecues/LBUserRow/LBUserRow';
import './styles.scss';

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data: User[] = await getUsers();
      console.log('i dati sono: ', data);
      setUsers(data);
    };

    getData();
  }, []);

  return (
    <div className="leaderboard">
      {users.map((user, index) => (
        <>
          <LBUserRow name={user.username} choices={user.choices} key={index} />
        </>
      ))}
    </div>
  );
};

export default Leaderboard;
