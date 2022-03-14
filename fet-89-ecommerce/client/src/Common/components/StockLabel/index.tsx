import styles from './StockLabel.module.scss';

interface Props {
  isOutOfStock?: boolean;
}

export const StockLabel = ({ isOutOfStock }: Props) => {
  return (
    <span 
      className={`${styles['stock-label']} ${isOutOfStock && styles['--invalid']}`}>
        {isOutOfStock ? 'out of stock' : 'in stock'}
    </span>
  );
};
