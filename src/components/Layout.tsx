import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="m-auto px-0 py-6 md:container font-custom">
        <Outlet />
      </main>
    </>
  );
}
