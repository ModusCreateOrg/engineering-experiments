import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from '../products/product.entity';

@Entity({ name: 'photos' })
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  uri: string;

  @Column({ type: 'int' })
  productId: number;

  @ManyToOne(() => ProductEntity, (ent) => ent.photos)
  product: ProductEntity;

  @Column({ type: 'int', default: 0 })
  isFeatured: 0 | 1;

  @CreateDateColumn({ type: 'text', default: new Date().toISOString() })
  createdAt: string;

  @UpdateDateColumn({ type: 'text', onUpdate: new Date().toISOString() })
  updatedAt: string;
}
