import { useState } from 'react';
import ChooseModal from '../../organisms/ChooseModal/ChooseModal';
import { useUser } from '../../utils/context/User/UserContext';
import './styles.scss';
import type Props from './types';

const Pick: React.FC<Props> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const { addChoice } = useUser();

  const closeModal = () => {
    setShowModal(false);
  };

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
          onClick={() => setShowModal(true)}>
          not picked
        </div>
      )}

      {showModal ? <ChooseModal showModal={showModal} handle={closeModal} /> : null}
    </>
  );
};

export default Pick;
