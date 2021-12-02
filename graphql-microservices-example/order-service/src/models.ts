import { Directive, Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export namespace OrderModel {
  @ObjectType()
  @Directive('@extends')
  @Directive('@key(fields: "id")')
  export class Location {
    @Directive('@external')
    id: string;

    @Field((type) => [Order])
    orders: Order[];
  }

  @ObjectType()
  @Directive('@extends')
  @Directive('@key(fields: "id")')
  export class Customer {
    @Directive('@external')
    id: string;

    @Field((type) => [Order])
    orders: Order[];
  }
  
  // main order table
  @ObjectType()
  @Directive('@key(fields: "id")')
  @Entity()
  export class Order {
    @PrimaryGeneratedColumn('uuid')
    public id: string;
    @Column('text')
    public code: string;
    @CreateDateColumn()
    public createdAt: Date;

    @Field(() => Location)
    location: Location;

    @Field((type) => Customer)
    customer: Customer;

    @Column()
    @Field()
    locationId: string;

    @Column()
    @Field()
    customerId: string;
  }
}
