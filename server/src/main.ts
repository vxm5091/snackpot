import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import express from 'express';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());
  app.use(compression()); // GQL output can get quite long, luckily it compresses well
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );

  await app.listen(3000);
}
bootstrap();
