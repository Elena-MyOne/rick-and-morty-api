import { Outlet } from 'react-router-dom';
import Header from './Header';
import SelectedItems from './SelectedItems';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="m-auto px-0 py-6 md:container font-custom relative">
        <Outlet />
        <SelectedItems />
      </main>
    </>
  );
}
