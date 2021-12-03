import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderModel } from "src/models";
import { OrderResolver } from "./order.resolver";
import { OrderService } from "./order.service";

@Module({
    imports: [TypeOrmModule.forFeature([OrderModel.Order])],
    providers: [OrderService, OrderResolver]
})
export class OrderModule {}