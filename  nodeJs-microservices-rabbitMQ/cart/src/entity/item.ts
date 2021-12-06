import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Item {
  @ObjectIdColumn()
  id: string;

  @Column({ unique: true })
  adminId: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column({ default: 0 })
  totalItems: number;

  @CreateDateColumn({ name: "createdAt", type: "datetime" })
  createdAt: Date;
}
