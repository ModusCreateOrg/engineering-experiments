import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerInput {

  @Field()
  id: string
  @Field()
  firstName: string
  @Field()
  lastName: string
  @Field()
  city: string
}