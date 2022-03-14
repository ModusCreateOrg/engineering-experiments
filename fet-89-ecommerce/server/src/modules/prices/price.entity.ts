import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from '../products/product.entity';

@Entity({ name: 'prices' })
export class PriceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  productId: number;

  @ManyToOne(() => ProductEntity, (ent) => ent.prices)
  product: ProductEntity;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @CreateDateColumn({ type: 'text', default: new Date().toISOString() })
  createdAt: string;
}
