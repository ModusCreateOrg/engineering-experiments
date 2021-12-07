import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
} from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CustomerModel } from '../models';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Resolver(() => CustomerModel.Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation(() => CustomerModel.Customer)
  createCustomer(@Args('customer') customerInput: CreateCustomerInput) {
    return this.customerService.create(customerInput);
  }

  @Query(() => [CustomerModel.Customer], { name: 'getAllCustomers' })
  findAll() {
    return this.customerService.findAll();
  }

  @Query(() => CustomerModel.Customer, { name: 'customer' })
  findOne(@Args('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Mutation(() => CustomerModel.Customer)
  updateCustomer(@Args('customer') customerInput: UpdateCustomerInput) {
    return this.customerService.update(customerInput.id, customerInput);
  }

  @Mutation(() => CustomerModel.Customer)
  removeCustomer(@Args('id') id: string) {
    return this.customerService.remove(id);
  }

  @ResolveReference()
  resolvereferance(ref: { __typename: string; id: string }) {
    return this.customerService.findOne(ref.id);
  }
}
