import axios from 'axios';
import { useUser } from '../../../utils/context/User/UserContext';
import Button from '../../atoms/Button/Button';
import Pick from '../../molecues/Pick/Pick';
import ChooseModal from '../ChooseModal/ChooseModal';
import Leaderboard from '../Leaderboard/Leaderboard';
import './styles.scss';
import type Props from './types';

const MainContent: React.FC<Props> = ({ title, type }) => {
  const { choices, showModal, closeModal, user, setUser } = useUser();

  // useEffect(() => {
  //   if (!user.username) {
  //     const storedUser = localStorage.getItem('user');
  //     if (storedUser) {
  //       setUser(JSON.parse(storedUser));
  //     }
  //   }
  // }, [setUser, user.username]);

  const lockChoices = async () => {
    const choicesId: string[] = [];
    choices.forEach((choice) => choicesId.push(choice._id));

    try {
      const userId = user._id; //user id di prova di uno user presente nel db
      await axios.post(`http://192.168.1.175:3000/api/choices/${userId}/save`, {
        choicesId,
      });
    } catch (error) {
      console.error("Errore nell'aggiornamento:", error);
    }
  };

  return (
    <div className="main-content">
      <div className="user-pick-container">
        <div className="title-section d-flex justify-content-center align-items-center">
          <span>{title}</span>
        </div>

        {type === 'bingo' ? (
          <>
            <h2>Scheda eventi</h2>
            <div className="scroll-content" style={{ overflowY: 'scroll' }}>
              <div className="picks-container">
                {choices.map((p) => (
                  <Pick data={p} key={p.index} />
                ))}
              </div>
              <div className="lock-choice m-2 ms-auto">
                <Button className="btn btn-primary" title="Conferma scelta" handle={lockChoices} />
              </div>
            </div>

            {showModal && <ChooseModal showModal={showModal} handle={closeModal} />}
          </>
        ) : (
          <Leaderboard />
        )}
      </div>
    </div>
  );
};

export default MainContent;
