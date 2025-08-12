import { useUser } from '../../utils/context/User/UserContext';
import './styles.scss';
import type Props from './types';

const Pick: React.FC<Props> = ({ data }) => {
  const { addChoice, closeModal, openModal } = useUser();

  return (
    <>
      {data.value !== '' ? (
        <div
          className="pick picked"
          onClick={() => {
            addChoice(data);
            closeModal();
          }}>
          <div className={`rarity-badge ${data.rarity}`}>{data.rarity}</div>
          <div className="pick-label d-flex justify-content-center align-items-center">
            <span>{data.value}</span>
          </div>
        </div>
      ) : (
        <div
          className="pick not-picked d-flex justify-content-center align-items-center"
          onClick={() => openModal(data.index)}>
          not picked
        </div>
      )}
    </>
  );
};

export default Pick;
