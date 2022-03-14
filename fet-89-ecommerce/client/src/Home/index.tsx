import { AnimatedCard } from "../Common/components/AnimatedCard";
import { Section } from "../Common/components/Section";
import styles from './Home.module.scss';
import { SECTIONS_MOCK } from "./MOCK";

export const HomeScreen = () => {
  const [featured, ...rest] = SECTIONS_MOCK
  return (
    <div className={styles['home-container']}>
      <AnimatedCard />
      <Section {...featured} />
    </div>
  );
};
