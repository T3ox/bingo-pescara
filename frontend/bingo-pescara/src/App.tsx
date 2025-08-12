import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './molecues/NotFound/NotFound';
import BingoPage from './pages/BingoPage/BingoPage';
import LandingPage from './pages/LandingPage';
import { AppProvider } from "./utils/context";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/bingo" element={<BingoPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </>
  );
}
