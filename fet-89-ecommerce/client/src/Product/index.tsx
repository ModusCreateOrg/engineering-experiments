import { ChangeEventHandler } from 'react';
import { useState } from 'react';
import { BuyButton } from '../Common/components/BuyButton';
import { QuantityInput } from '../Common/components/QuantityInput';
import { ScalableImage } from '../Common/components/ScalableImage';
import { Section } from '../Common/components/Section';
import { Spacer } from '../Common/components/Spacer';
import { StockLabel } from '../Common/components/StockLabel';
import { TagList } from '../Common/components/TagList';
import { SECTIONS_MOCK } from '../Home/MOCK';
import styles from './Product.module.scss';

interface ProductDto {
  id: number;
  title: string;
  price: number;
  imageUri: string;
  description: string;
  availableStock: number;
  tags: string[];
}

export const ProductScreen = ({ 
  availableStock = 9,
  title = 'Awesome Leather Shirt',
  price = 97.50,
  imageUri = 'https://demo2wpopal.b-cdn.net/freshio/wp-content/uploads/2020/08/38.jpg',
  description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, deleniti harum, iste est commodi quia sit ex dicta iusto ipsa eum alias officia obcaecati, consequuntur cum ratione? Eius, magnam incidunt.'
}: ProductDto) => {
  const [_, related] = SECTIONS_MOCK;
  const [quantity, setQuantity] = useState(1);

  const onQuatityDecrease = () => quantity > 1 && setQuantity(quantity - 1);

  const onQuatityIncrease = () => quantity < availableStock && setQuantity(quantity + 1);

  const onQuantityChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    if (Number(value) > availableStock) return;
    setQuantity(Number(value));
  }

  return (
    <div className={styles['product-container']}>
      <div className={styles['content']}>
        <div className={`${styles['col']} ${styles['left']}`}>
          <ScalableImage imageUri={imageUri} />  
        </div>
        <Spacer width={32} />
        <div className={styles['col']}>
          <StockLabel />  
          <h1 className="font-title">{title}</h1>
          <h2>${price.toFixed(2)}</h2>
          <p>{description}</p>
          <QuantityInput 
            value={quantity} 
            max={availableStock}
            onChange={onQuantityChange}
            onStepUp={onQuatityIncrease}
            onStepDown={onQuatityDecrease}
          />
          <span className={styles['stock']}>Stock: {availableStock}</span>
          <BuyButton variant="chart" />
          <TagList tags={['juice', 'tart']} />
        </div>
      </div>
      <div className={styles['related-products']}>
        <h3 className="font-title">Related products</h3>
        <Section showControl={false} showTitle={false} {...related} />
      </div>
    </div>
  );
};
