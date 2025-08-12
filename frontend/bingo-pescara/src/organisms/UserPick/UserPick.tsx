import Pick from '../../molecues/Pick/Pick';
import { useUser } from '../../utils/context/User/UserContext';
import './styles.scss';

const UserPick = () => {
  const { choices } = useUser();

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
    </div>
  );
};

export default UserPick;
