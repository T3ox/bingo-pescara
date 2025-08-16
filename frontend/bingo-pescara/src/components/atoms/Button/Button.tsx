import type Props from './types';

const Button: React.FC<Props> = ({ className, title, handle, children }) => {
  return (
    <>
      <button className={className} onClick={handle}>
        <div>
          {title}
          {children}
        </div>
      </button>
    </>
  );
};

export default Button;
