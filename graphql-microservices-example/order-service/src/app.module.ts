import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { OrderModel } from './models';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    OrderModule,
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [OrderModel.Customer, OrderModel.Location],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'order-db',
      entities: ['dist/models.js'],
      synchronize: false,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
