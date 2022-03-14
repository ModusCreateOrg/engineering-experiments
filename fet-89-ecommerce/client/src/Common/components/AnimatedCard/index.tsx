import styles from './AnimatedCard.module.scss';

interface Props {
  title?: string;
  imageSrc?: string;
}

export const AnimatedCard = ({ 
  title = 'Discover Real Organic Flavors', 
  imageSrc = '/images/card-1.png' 
}: Props) => {
  return (
    <div className={styles['animated-card']}>
      <div className={styles['content']}>
        <h1>{title}</h1>
        <a href="">Shop now</a>
      </div>
      <img className={styles['image']} src={imageSrc} alt="" />
    </div>
  );
};
