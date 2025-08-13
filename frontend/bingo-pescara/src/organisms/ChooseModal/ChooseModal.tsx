import React, { useEffect, useState } from 'react';
import Button from '../../atoms/Button/Button';
import Pick from '../../molecues/Pick/Pick';
import { useUser } from '../../utils/context/User/UserContext';
import { events } from '../../utils/events';
import type { BingoEvent } from '../../utils/types';
import './styles.scss';
import type Props from './types';

const ChooseModal: React.FC<Props> = ({ showModal, handle }) => {
  const [data, setData] = useState<BingoEvent[]>([]);
  const { choices } = useUser();
  useEffect(() => {
    // GET DEGLI EVENTI
    setData(events.filter((event) => !choices.some((choice) => choice.value === event.value)));
  }, [choices]);

  return (
    <div
      className={`modal fade ${showModal ? 'show' : ' '}`}
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title" id="staticBackdropLabel">
              Cart
            </h5>
            <Button className="btn btn-close" title="" handle={handle} />
          </div>
          <div className="modal-body">
            {data.map((p, index) => (
              <Pick data={p} key={index} />
            ))}
          </div>
          <div className="modal-footer">
            <Button className="btn btn-primary" title="Conferma" handle={handle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseModal;
