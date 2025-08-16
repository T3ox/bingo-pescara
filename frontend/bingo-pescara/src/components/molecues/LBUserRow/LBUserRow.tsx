import './styles.scss';
import type Props from './types';

const LBUserRow: React.FC<Props> = ({ name, choices }) => {
  const points = () => {
    const rarityPoints: Record<string, number> = {
      common: 1,
      uncommon: 2,
      rare: 3,
      epic: 4,
      legendary: 5,
    };

    const total = 0;
    /*choices.forEach((c) => {
      if (c.occured) {
        total += rarityPoints[c.rarity.toLowerCase()] || 0;
      }
    });*/

    return total;
  };

  return (
    <>
      <div className="user-row d-flex justify-content-between align-items-center">
        <span>1</span>
        <span>{name}</span>
        <div className="choices d-flex">
          {choices?.map((c, index) => <div className={`circle `} key={index}></div>)}
        </div>

        <span>{points()}</span>
      </div>
    </>
  );
};

export default LBUserRow;
