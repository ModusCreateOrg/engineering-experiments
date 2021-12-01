import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLGatewayModule.forRoot({
      server: {
        cors: true,
      },
      gateway: {
        serviceList: [
          {
            name: 'customers',
            url: '',
          },
          {
            name: 'orders',
            url: '',
          },
          {
            name: 'locations',
            url: '',
          },
        ],
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
