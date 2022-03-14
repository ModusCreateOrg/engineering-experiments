import { ChangeEventHandler } from 'react';
import styles from './QuantityInput.module.scss';

interface Props {
  value?: number;
  min?: number;
  max?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onStepUp?: () => void;
  onStepDown?: () => void;
}

export const QuantityInput = ({ value = 1, min = 1, max = 2, onChange, onStepUp, onStepDown }: Props) => {
  return (
    <div className={styles['quantity-input']}>
      <button onClick={onStepUp}>{'+'}</button>
      <input type="number" value={String(value)} min={min} max={max} onChange={onChange} />
      <button onClick={onStepDown}>{'-'}</button>
    </div>
  );
};
