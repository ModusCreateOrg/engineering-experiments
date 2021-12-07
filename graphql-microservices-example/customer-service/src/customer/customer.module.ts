import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModel } from 'src/models';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerModel.Customer])],
    providers: [CustomerResolver, CustomerService],
    exports: [CustomerService]
})
export class CustomerModule { }