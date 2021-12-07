import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
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
    @Field((type) => ID)
    @Directive('@external')
    id: string;

    @Field((type) => [Order])
    orders: Order[];
  }

  @ObjectType()
  @Directive('@extends')
  @Directive('@key(fields: "id")')
  export class Customer {
    @Field((type) => ID)
    @Directive('@external')
    id: string;

    @Field((type) => [Order])
    orders: Order[];
  }
  
  // main order table
  @ObjectType()
  @Directive('@key(fields: "id")')
  @Entity("Order")
  export class Order {
    @Field((type) => ID)
    @PrimaryGeneratedColumn('uuid')
    public id: string;
    @Field()
    @Column('text')
    public code: string;
    @Field()
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
