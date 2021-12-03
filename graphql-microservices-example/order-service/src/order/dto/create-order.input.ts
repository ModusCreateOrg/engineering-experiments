import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class CreateOrderInput {
    @Field()
    code: string
    @Field()
    locationId: string
    @Field()
    customerId: string
}