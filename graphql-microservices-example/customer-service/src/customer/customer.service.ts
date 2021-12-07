import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { CustomerModel } from '../models';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerModel.Customer)
    private customerRepository: Repository<CustomerModel.Customer>,
  ) {}

  create(customer: CreateCustomerInput): Promise<CustomerModel.Customer> {
    let customerModel = this.customerRepository.create(customer);
    return this.customerRepository.save(customerModel);
  }

  async findAll(): Promise<CustomerModel.Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: string): Promise<CustomerModel.Customer> {
    return this.customerRepository.findOne(id);
  }

  update(id: string, updateCustomerInput: UpdateCustomerInput) {
    let customer = this.customerRepository.create(updateCustomerInput);
    customer.id = id;
    return this.customerRepository.save(customer);
  }

  async remove(id: string) {
    let customer = this.findOne(id);
    if (customer) {
      let deletedCustomer = await this.customerRepository.delete(id);
      if (deletedCustomer.affected === 1) {
        return customer;
      }
    }
    throw new NotFoundException(`Not Found Customer by ID: ${id}`);
  }
}
