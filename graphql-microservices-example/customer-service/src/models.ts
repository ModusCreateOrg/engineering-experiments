import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export namespace CustomerModel {
  @ObjectType()
  @Directive('@key(fields: "id")')
  @Entity()
  export class Customer {
    @Field((type) => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Field()
    @Column()
    firstName: string;
    @Field()
    @Column()
    lastName: string;
    @Field({ nullable: true })
    @Column({ nullable: true })
    city: string;
  }
}
