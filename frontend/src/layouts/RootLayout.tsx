import { Outlet } from 'react-router-dom';
import { Header } from '../components/UI/Header/Header';
import { Footer } from '../components/UI/Footer/Footer';
import { useGA4 } from '../hooks/useGA4';
import { useCanonical } from '../hooks/useCanonical';
import styles from './RootLayout.module.scss';

export function RootLayout() {
  useGA4();
  useCanonical();
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
