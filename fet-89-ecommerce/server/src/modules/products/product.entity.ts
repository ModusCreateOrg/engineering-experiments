import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PhotoEntity } from '../photos/photo.entity';
import { PriceEntity } from '../prices/price.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', default: 'change me' })
  description: string;

  @OneToMany(() => PriceEntity, (ent) => ent.product)
  prices: PriceEntity[];

  @OneToMany(() => PhotoEntity, (ent) => ent.product)
  photos: PhotoEntity[];

  @Column({ type: 'int', nullable: false })
  quantityAvailable: number;

  @CreateDateColumn({ type: 'text', default: new Date().toISOString() })
  createdAt: string;

  @UpdateDateColumn({ type: 'text', onUpdate: new Date().toISOString() })
  updatedAt: string;
}
