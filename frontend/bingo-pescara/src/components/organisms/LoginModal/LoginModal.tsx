import { useCallback, useState } from 'react';
import lock from '../../../assets/lock.svg';
import { useUser } from '../../../utils/context/User/UserContext';
import Button from '../../atoms/Button/Button';
import LoginInput from '../../atoms/LoginInput/LoginInput';
import './styles.scss';

const LoginModal = () => {
  const { doRegister, doLogin } = useUser();
  const [isRegisterd, setIsRegisterd] = useState(false);
  const [showError, setShowError] = useState('');

  const [loginForm, setLoginForm] = useState({
    username: '',
    email: '',
    password: '',
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

  const onChangePassword = useCallback(
    (password: string) => {
      console.log('Kyoka Suigetsu');
      setLoginForm({ ...loginForm, password });
    },
    [loginForm]
  );

  return (
    <div className="container-fluid modal-container">
      <div className="row vh-100 align-content-center justify-content-center">
        <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          {isRegisterd ? (
            <form
              className="login-form"
              onSubmit={(event) => {
                event.preventDefault();
                //formLogin(loginForm.username, loginForm.password);
              }}>
              <h1 className="text-center">Ben tornato!</h1>
              <LoginInput placeholder="Username" isPassword={false} onChangeText={onChangeUsername} />
              <LoginInput
                placeholder="Password"
                isPassword={true}
                onChangeText={onChangePassword}
                rightIcon={<img src={lock} alt="lock" />}
              />
              <a
                onClick={() => {
                  setIsRegisterd(false);
                }}>
                Non sei ancora registrato?
              </a>
              <div className="row justify-content-center">
                <Button
                  title="Login"
                  className="btn rounded-pill button-form"
                  handle={async () => {
                    const errorMessage = await doLogin(loginForm.username, loginForm.password);
                    if (errorMessage) {
                      setShowError(errorMessage);
                    } else {
                      setShowError('');
                    }
                  }}
                />
                {showError && <span style={{ color: 'red' }}>{showError}</span>}
              </div>
            </form>
          ) : (
            <form
              className="login-form"
              onSubmit={(event) => {
                event.preventDefault();
                //formLogin(loginForm.username, loginForm.password);
              }}>
              <h1 className="text-center">Benvenuto!</h1>
              <LoginInput placeholder="Username" isPassword={false} onChangeText={onChangeUsername} />
              <LoginInput placeholder="Email" isPassword={false} onChangeText={onChangeEmail} />
              <LoginInput
                placeholder="Password"
                isPassword={true}
                onChangeText={onChangePassword}
                rightIcon={<img src={lock} alt="lock" />}
              />
              <a
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsRegisterd(true);
                }}>
                Sei già registrato?
              </a>
              <div className="row justify-content-center">
                <Button
                  title="Register"
                  className="btn rounded-pill button-form"
                  handle={async () => {
                    const errorMessage = await doRegister(
                      loginForm.username,
                      loginForm.email,
                      loginForm.password
                    );
                    if (errorMessage) {
                      setShowError(errorMessage);
                    } else {
                      setShowError('');
                    }
                  }}
                />
                {showError && <span style={{ color: 'red' }}>{showError}</span>}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
