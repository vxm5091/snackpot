import { OrderResolver } from '@app/graphql/order/order.resolver';
import { GroupService } from '@app/services/group/group.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [OrderResolver, GroupService],
  exports: [OrderResolver],
})
export class OrderGqlModule {}
