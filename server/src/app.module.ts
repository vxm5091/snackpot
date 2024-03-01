import { GraphqlModule } from '@app/graphql/graphql.module';
import { MikroOrmRequestContextMiddleware } from '@app/middleware/mikroOrmRequestContext.middleware';
import { ServicesModule } from '@app/services/services.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forRoot(), GraphqlModule, ServicesModule],
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
    await consumer.apply(MikroOrmRequestContextMiddleware).forRoutes('graphql');
  }
}
