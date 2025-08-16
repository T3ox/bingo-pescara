import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../atoms/Button/Button';
import LoginModal from '../../organisms/LoginModal/LoginModal';
import './styles.scss';

const LoginCard = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <>
      <div className="login-card d-flex justify-content-center align-items-center flex-column">
        <h1>Benvenuti al BingoPescara</h1>
        <Button
          className="btn btn-primary"
          title="Esegui il Login"
          handle={() => {
            setShowLoginModal(true);
          }}
        />
        {showLoginModal ? <LoginModal /> : null}
      </div>
    </>
  );
};

export default LoginCard;
