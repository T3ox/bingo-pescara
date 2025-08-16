import { useUser } from '../../../utils/context/User/UserContext';
import Pick from '../../molecues/Pick/Pick';
import ChooseModal from '../ChooseModal/ChooseModal';
import './styles.scss';

const UserPick = () => {
  const { choices, showModal, closeModal } = useUser();

  return (
    <div className="user-pick-container">
      <div className="title-section d-flex justify-content-center align-items-center">
        <span>IL TUO BINGO</span>
      </div>
      <h2>Scheda eventi</h2>
      <div className="picks-container">
        {choices.map((p) => (
          <Pick data={p} key={p.index} />
        ))}
      </div>
      {showModal ? <ChooseModal showModal={showModal} handle={closeModal} /> : null}
    </div>
  );
};

export default UserPick;
