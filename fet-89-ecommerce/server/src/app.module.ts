import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { PricesModule } from './modules/prices/prices.module';
import { PhotosModule } from './modules/photos/photos.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../db',
      autoLoadEntities: true,
      entities: ['/src/modules/**/*.entity.ts'],
      synchronize: true,
      logging: true,
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsRun: true,
      cli: {
        migrationsDir: 'src/migration',
      },
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    PricesModule,
    PhotosModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
