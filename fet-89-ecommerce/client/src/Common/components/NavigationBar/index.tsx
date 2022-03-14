import Link from 'next/link';
import { useChart } from '../../contexts/Chart';
import { ChartButton } from '../ChartButton';
import { MENU_LINKS } from './config';
import styles from './NavigationBar.module.scss';

export const NavigationBar = () => {
  const { count } = useChart();
  
  return (
    <>
      <nav className={styles['navigation-bar']}>
        <div>
          <div className={styles['toggle']}>
            <div className={styles['menu']}></div>
            <span className="font-title color-light desktop-only">Shop by Department</span>
            <div className={styles['collapsable']}>
              <ul>
                {MENU_LINKS.map((item, i) => (
                  <li key={i}>
                    <Link href={item.slug} passHref>
                      <a href={item.slug}>{item.label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles['control']}>
            <a href="">&nbsp;</a>
            <a className="desktop-only" title="register" href="">Register</a>
            <ChartButton count={count} />
          </div>
        </div>
      </nav>
      <div className={`${styles['fab']} ${styles['--show']}`}>
        <span>{count}</span>
      </div>
    </>
  );
};
