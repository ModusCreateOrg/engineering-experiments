import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderModel } from '../models';
import { CreateOrderInput } from './dto/create-order.input';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderModel.Order)
    private orderRepository: Repository<OrderModel.Order>,
  ) {}

  async createOrder(orderInput: CreateOrderInput): Promise<OrderModel.Order> {
    let orderModel = this.orderRepository.create(orderInput);
    const orderResponse = await this.orderRepository.save(orderModel);
    return orderResponse;
  }

  async findAll(): Promise<OrderModel.Order[]> {
    return this.orderRepository.find();
  }

  async forLocation(id: string) {
    return await this.orderRepository.find({ "locationId": id });
  }

  async forCustomer(id: string) {
    return await this.orderRepository.find({ "customerId": id });
}
}
