// import pescaraImg from '../assets/pescara.jpeg';
import LoginCard from '../molecues/LoginCard/LoginCard';
import './styles.scss';

const LandingPage = () => {
  return (
    <div className="login-container position-relative vw-100 vh-100">
      {/* <img
        src={pescaraImg}
        alt="Background"
        className="login-bg position-absolute top-0 start-0 w-100 h-100"
      /> */}
      <div className="login-bg position-absolute top-0 start-0 w-100 h-100"></div>

      <div className="login-card_container position-absolute top-50 start-50 translate-middle">
        <LoginCard></LoginCard>
      </div>
    </div>
  );
};

export default LandingPage;
