import { useNavigate } from 'react-router-dom';
import Button from '../../atoms/Button/Button';
import './styles.scss';

const LoginCard = () => {
  const navigate = useNavigate();
  return (
    <div className="login-card d-flex justify-content-center align-items-center flex-column">
      <h1>Benvenuti al BingoPescara</h1>
      <Button
        className="btn btn-primary"
        title="Esegui il Login"
        handle={() => {
          navigate('/bingo');
        }}></Button>
    </div>
  );
};

export default LoginCard;
