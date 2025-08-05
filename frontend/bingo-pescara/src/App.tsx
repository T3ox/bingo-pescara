import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BingoPage from './pages/BingoPage/BingoPage';
import NotFound from './molecues/NotFound/NotFound';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/bingo" element={<BingoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
