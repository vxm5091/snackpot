import { OrderResolver } from '@app/graphql/order/order.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [OrderResolver],
  exports: [OrderResolver],
})
export class OrderGqlModule {}
