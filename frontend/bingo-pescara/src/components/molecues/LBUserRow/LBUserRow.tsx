import './styles.scss';
import type Props from "./types"

const LBUserRow: React.FC<Props> = ({ name, choices, pts }) => {
  return (
    <>
      <div className="user-row d-flex justify-content-between align-items-center">
        <span>1</span>
        <span>Teo</span>
        <div className="choices"></div>
        <span>3</span>
      </div>
    </>
  );
};

export default LBUserRow;
