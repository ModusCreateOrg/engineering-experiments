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
            name: 'orders',
            url: 'http://localhost:5001/graphql',
          }
        ],
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
