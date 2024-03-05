import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import * as express from 'express';
// import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());
  app.use(compression()); // GQL output can get quite long, luckily it compresses well
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: process.env.NODE_ENV === 'development',
      transform: true,
    }),
  );
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );
  // app.enableCors({
  //   origin: ['http://localhost'],
  // });

  await app.listen(3000);
}
bootstrap();
