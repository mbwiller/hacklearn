import { Outlet } from 'react-router-dom';
import { Header } from '../navigation/Header';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
