import { MikroOrmRequestContextMiddleware } from '@app/middleware/mikroOrmRequestContext.middleware';
import { ServicesModule } from '@app/services/services.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [MikroOrmModule.forRoot(), GraphQLModule, ServicesModule],
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
    await consumer.apply(MikroOrmRequestContextMiddleware).forRoutes('graphql');
  }
}
