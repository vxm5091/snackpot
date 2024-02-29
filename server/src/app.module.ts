import { GraphQLService } from '@app/graphql/graphql.service';
import { MikroOrmRequestContextMiddleware } from '@app/middleware/mikroOrmRequestContext.middleware';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLService,
    }),
  ],
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
    await consumer.apply(MikroOrmRequestContextMiddleware).forRoutes('graphql');
  }
}
