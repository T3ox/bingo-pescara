import { useEffect } from 'react';
import userIcon from '../../../assets/6522516.png';
import { useUser } from '../../../utils/context/User/UserContext';
import MainContent from '../../organisms/MainContent/MainContent';
import './styles.scss';

const BingoPage = () => {
  const { user, setUser } = useUser(); // aggiungi setUser se vuoi aggiornare lo state

  useEffect(() => {
    if (!user.username) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [setUser, user.username]);

  return (
    <div className="main-section d-flex justify-content-center align-items-end flex-column">
      <div className="user d-flex align-items-center">
        <span>{user.username}</span>
        <img src={userIcon} alt="" />
      </div>
      <MainContent title="IL TUO BINGO" type="bingo" />
    </div>
  );
};

export default BingoPage;
