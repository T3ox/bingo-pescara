import Circle from '../../atoms/Circle/Circle';
import './styles.scss';
import type Props from './types';

const LBUserRow: React.FC<Props> = ({ name, choices, rank }) => {
  const points = () => {
    const rarityPoints: Record<string, number> = {
      common: 1,
      uncommon: 2,
      rare: 3,
      epic: 4,
      legendary: 5,
    };

    let total = 0;

    choices.forEach((c) => {
      if (c.occurred) {
        total += rarityPoints[c.rarity.toLowerCase()] || 0;
      }
    });

    return total;
  };

  const podiumClass = rank == 1 ? 'first' : rank == 2 ? 'second' : rank == 3 ? 'third' : '';

  return (
    <>
      <div className={`user-row d-flex justify-content-between align-items-center ${podiumClass}`}>
        <div className="user-row_first d-flex">
          <span>{rank}</span>
          <span>{name}</span>
        </div>
        <div className="choices d-flex flex-row-reverse">
          {choices.map((c, index) => (
            <>
              <Circle {...c} key={index} />
            </>
          ))}
        </div>

        <span>{points()}</span>
      </div>
    </>
  );
};

export default LBUserRow;
