import LeftPanel from '../../components/organisms/LeftPanel/LeftPanel';
import type Props from './types';

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: '#acdcf9' }}>
      <LeftPanel />
      {children}
    </div>
  );
};

export default Layout;
