import styles from './SimpleButton.module.scss';

interface Props {
  onClick?: () => void;
  children: string;
}

export const SimpleButton = ({ children, onClick }: Props) => {
  return <button onClick={onClick} className={styles['simple-button']}>{children}</button>
}