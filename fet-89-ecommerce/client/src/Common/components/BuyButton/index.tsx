import styles from './BuyButton.module.scss';

interface Props {
  variant?: 'chart' | 'buy';
  onPress?: () => void;
}

export const BuyButton = ({ variant = 'buy', onPress }: Props) => {
  const label: Record<Props['variant'], string> = {
    buy: 'Buy Now',
    chart: 'Add to Chart'
  }

  return (
    <button className={styles['buy-button']} onClick={onPress}>{label[variant]}</button>
  );
};
