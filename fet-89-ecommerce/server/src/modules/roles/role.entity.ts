import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRoles {
  ADMIN = 0,
  MODERATOR = 1,
  USER = 2,
}

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  value: UserRoles;

  @Column({ type: 'text', nullable: false })
  description: string;

  @UpdateDateColumn({ type: 'text', onUpdate: new Date().toISOString() })
  updatedAt: string;
}
