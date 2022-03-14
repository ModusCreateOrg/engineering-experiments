import styles from './ChartButton.module.scss';

interface Props {
  count: number;
}

export const ChartButton = ({ count }: Props) => {  
  return (
    <button className={styles['chart-button']}>
      Chart
      <span>{count}</span>
    </button>
  );
};
