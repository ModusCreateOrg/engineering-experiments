import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { OrderService } from "./order.service";
import { OrderModel } from "../models";

@Resolver((of) => OrderModel.Customer)
export class CustomerResolver {

    constructor(private readonly orderService: OrderService) { }

    @ResolveField((of) => [OrderModel.Order])
    orders(@Parent() customer: OrderModel.Customer): Promise<OrderModel.Order[]> {
        console.log('resolving customers', customer.id)
        return this.orderService.forCustomer(customer.id);
    }




}