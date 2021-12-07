import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { OrderModel } from "../models";
import { OrderService } from "../order/order.service";

@Resolver((of) => Location)
export class LocationResolver {

    constructor(private readonly orderService: OrderService) { }

    @ResolveField((of) => [OrderModel.Order])
    orders(@Parent() location: OrderModel.Location): Promise<OrderModel.Order[]> {
        return this.orderService.forLocation(location.id);
    }

}