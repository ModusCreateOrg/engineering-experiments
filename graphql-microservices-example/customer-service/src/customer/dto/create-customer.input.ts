import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field()
  firstName: string
  @Field()
  lastName: string
  @Field()
  city: string
}