import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module'
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    CustomerModule,
    GraphQLFederationModule.forRoot(
      {
        autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql')
      }
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'customer-db',
      entities: ['dist/models.js'],
      synchronize: false,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

