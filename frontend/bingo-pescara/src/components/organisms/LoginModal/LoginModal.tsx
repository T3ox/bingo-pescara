import axios from 'axios';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lock from '../../../assets/lock.svg';
import Button from '../../atoms/Button/Button';
import LoginInput from '../../atoms/LoginInput/LoginInput';
import './styles.scss';

const LoginModal = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: '',
    email: '',
  });

  const onChangeUsername = useCallback(
    (username: string) => {
      setLoginForm({ ...loginForm, username });
    },
    [loginForm]
  );

  const onChangeEmail = useCallback(
    (email: string) => {
      setLoginForm({ ...loginForm, email });
    },
    [loginForm]
  );

  const doLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/utenti', {
        username: loginForm.username,
        email: loginForm.email,
        // password: loginForm.password  <-- se decidi di gestirla
      });

      console.log('Utente creato:', response.data);

      // vai alla pagina profilo
      navigate('/my-profile');
    } catch (error) {
      console.warn('Errore di rete', error);
    }
  };

  return (
    <div className="container-fluid modal-container">
      <div className="row vh-100 align-content-center justify-content-center">
        <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <form
            className="login-form"
            onSubmit={(event) => {
              event.preventDefault();
              //formLogin(loginForm.username, loginForm.password);
            }}>
            <h1 className="text-center py-5">Benvenuto!</h1>
            <LoginInput placeholder="Username" isPassword={false} onChangeText={onChangeUsername} />
            <LoginInput placeholder="Email" isPassword={false} onChangeText={onChangeEmail} />
            <LoginInput
              placeholder="Password"
              isPassword={true}
              onChangeText={() => {
                console.log('Kyoka Suigetsu');
              }}
              rightIcon={<img src={lock} alt="lock" />}
            />
            <div className="row mb-4 justify-content-center">
              <Button
                title="Login"
                className="btn rounded-pill button-form my-5"
                handle={() => {
                  doLogin();
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
