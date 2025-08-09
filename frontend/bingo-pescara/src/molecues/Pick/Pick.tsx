import { useState } from 'react';
import ChooseModal from '../../organisms/ChooseModal/ChooseModal';
import './styles.scss';
import type Props from './types';

const Pick: React.FC<Props> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };
  
  return (
    <>
      {data.value !== '' ? (
        <div className="pick picked">
          <div className={`rarity-badge ${data.rarity}`}>{data.rarity}</div>
          <div className="pick-label d-flex justify-content-center align-items-center">
            <span>{data.value}</span>
          </div>
        </div>
      ) : (
        <div
          className="pick not-picked d-flex justify-content-center align-items-center"
          onClick={() => {
            setShowModal(true);
            console.log('clicked', showModal);
          }}>
          not picked
        </div>
      )}

      {showModal ? <ChooseModal showModal={showModal} handle={closeModal} /> : null}
    </>
  );
};

export default Pick;
