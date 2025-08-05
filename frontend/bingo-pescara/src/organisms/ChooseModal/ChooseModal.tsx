import React, { useEffect, useState } from 'react';
import Button from '../../atoms/Button/Button';
import Pick from '../../molecues/Pick/Pick';
import { events } from '../../utils/events';
import type { BingoEvent } from '../../utils/types';
import './styles.scss';
import type Props from './types';

const ChooseModal: React.FC<Props> = ({ showModal, handle }) => {
  const [data, setdata] = useState<BingoEvent[]>([]);
  useEffect(() => {
    // GET DEGLI EVENTI
    setdata(events);
  }, []);

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
            <Button
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              title=""
              handle={handle}
            />
          </div>
          <div className="modal-body">
            {data.map((p, index) => (
              <Pick data={p} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseModal;
