import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import NotFound from './components/molecues/NotFound/NotFound.tsx';
import BingoPage from './components/pages/BingoPage/BingoPage.tsx';
import LandingPage from './components/pages/LandingPage.tsx';
import LeaderboardPage from './components/pages/LeaderboardPage/LeaderboardPage.tsx';
import { AppProvider } from './utils/context';
import Layout from './utils/Layout/Layout.tsx';

const AppRoutes = () => {
  const location = useLocation();
  const hideLayout = location.pathname === '/';

  return hideLayout ? (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  ) : (
    <Layout>
      <Routes>
        <Route path="/my-profile" element={<BingoPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Layout>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
