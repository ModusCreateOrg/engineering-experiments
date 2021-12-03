import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OrderModel } from '../models';
import { OrderService } from './order.service';
import { CreateOrderInput } from './dto/create-order.input';

@Resolver(() => OrderModel.Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Mutation(() => OrderModel.Order, { name: 'createOrder' })
  createOrder(@Args('orderInput') input: CreateOrderInput) {
    return this.orderService.createOrder(input);
  }
}
