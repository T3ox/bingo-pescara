import React, { useEffect, useState } from 'react';
import getEvents from '../../../API/getEvents';
import { useUser } from '../../../utils/context/User/UserContext';
import type { BingoEvent } from '../../../utils/types';
import Button from '../../atoms/Button/Button';
import Pick from '../../molecues/Pick/Pick';
import './styles.scss';
import type Props from './types';

const ChooseModal: React.FC<Props> = ({ showModal, handle }) => {
  const [data, setData] = useState<BingoEvent[]>([]);
  const { choices } = useUser();

  const rarityOrder = React.useMemo<Record<BingoEvent['rarity'], number>>(
    () => ({
      common: 1,
      uncommon: 2,
      rare: 3,
      epic: 4,
      legendary: 5,
      mythic: 6,
    }),
    []
  );

  useEffect(() => {
    const getData = async () => {
      let events: BingoEvent[] = [];

      const storedData = localStorage.getItem('events');

      if (storedData) {
        events = JSON.parse(storedData);
      } else {
        events = await getEvents();
        localStorage.setItem('events', JSON.stringify(events));
      }

      const filtered = events.filter((event) => !choices.some((choice) => choice.value === event.value));

      const sorted = filtered.sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);

      setData(sorted);
    };

    getData();
  }, [choices, rarityOrder]);

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
              Eventi
            </h5>
            <Button className="btn btn-close" title="" handle={handle} />
          </div>
          <div className="modal-body">
            {data.map((p, index) => (
              <Pick data={p} key={index} />
            ))}
          </div>
          <div className="modal-footer">
            <Button className="btn btn-danger" title="Chiudi" handle={handle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseModal;
