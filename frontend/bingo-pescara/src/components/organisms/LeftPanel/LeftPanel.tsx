import { useNavigate } from 'react-router-dom';
import Button from '../../../atoms/Button/Button';
import './styles.scss';

const LeftPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="left-panel">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <Button
          className="btn btn-primary"
          title="Il tuo Bingo"
          handle={() => navigate('/my-profile')}
        />
        <Button
          className="btn btn-primary"
          title="Classifica"
          handle={() => navigate('/leaderboard')}
        />
      </div>
    </div>
  );
};

export default LeftPanel;
