import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(process.env.NODE_ENV === 'production' ? 5000 : 5050);
}

bootstrap();

// всё работает