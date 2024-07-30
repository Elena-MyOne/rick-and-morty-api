import { Outlet } from 'react-router-dom';
import Header from './Header';
import SelectedItems from './SelectedItems';
import ThemesSelection from './ThemesSelection';
import { useContext } from 'react';
import { ThemeContext } from '../Contexts/AppContext';

export default function Layout() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme === 'light' ? 'bg-white' : 'bg-gray-600'}>
      <Header />
      <main className="m-auto px-0 py-6 md:container font-custom relative ">
        <ThemesSelection />
        <Outlet />
        <SelectedItems />
      </main>
    </div>
  );
}
