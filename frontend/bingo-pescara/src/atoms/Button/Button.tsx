import type Props from './types';

const Button: React.FC<Props> = ({ className, title, handle }) => {
  return (
    <>
      <button className={className} onClick={handle}>
        {title}
      </button>
    </>
  );
};

export default Button;
