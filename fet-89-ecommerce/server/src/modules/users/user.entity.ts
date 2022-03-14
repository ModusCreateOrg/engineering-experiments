import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { RoleEntity, UserRoles } from '../roles/role.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  @Generated('uuid')
  uuid: string;

  @OneToOne(() => RoleEntity, (ent) => ent.value)
  @Column({ default: UserRoles.USER })
  role: number;

  @CreateDateColumn({ type: 'text', default: new Date().toISOString() })
  createdAt: string;

  @UpdateDateColumn({ type: 'text', onUpdate: new Date().toISOString() })
  updatedAt: string;

  @Column({ type: 'text', unique: true, nullable: false })
  username: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ type: 'text', nullable: false })
  password: string;

  @Exclude()
  @Column({ type: 'text', nullable: false })
  salt: string;

  @Column({ type: 'int', default: 1 })
  isActive: 0 | 1;
}
