import UserPick from '../../organisms/UserPick/UserPick';
import './styles.scss';

const BingoPage = () => {
  return (
    <div className="main-section d-flex justify-content-center align-items-center">
      <div className="main-content">
        <UserPick />
      </div>
    </div>
  );
};

export default BingoPage;
