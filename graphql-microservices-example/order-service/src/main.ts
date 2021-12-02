import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5001, () => {
    console.log('listening on 5001');
  });
}
bootstrap();
