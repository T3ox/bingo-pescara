import { useState } from 'react';
import type { BingoEvent } from '../../../utils/types';
import './styles.scss';

const Circle = ({ value, rarity, occurred }: BingoEvent) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`circle ${occurred ? 'occurred' : ''}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}>
      {showTooltip && (
        <div className="tooltip">
          <p>{value}</p>
          {occurred && <span>✅</span>}
          <small className={`${occurred ? 'occurred' : ''}`}>Rarità: {rarity}</small>
        </div>
      )}
    </div>
  );
};

export default Circle;
