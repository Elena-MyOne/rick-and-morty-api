import { Routes, Route } from 'react-router-dom';
import { ROUTE_PATHS } from './enums';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import DetailsPage from './pages/DetailsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.MAIN} element={<Layout />}>
        <Route path={ROUTE_PATHS.MAIN} element={<MainPage />}>
          <Route path={ROUTE_PATHS.DETAILS} element={<DetailsPage />}></Route>
        </Route>
        <Route path={ROUTE_PATHS.NOTFOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
