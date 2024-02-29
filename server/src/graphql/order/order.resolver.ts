import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { Group } from '@app/graphql/group/group.model';
import { EOrderField, Order } from '@app/graphql/order/order.model';
import { Transaction } from '@app/graphql/transaction/transaction.model';
import { User } from '@app/graphql/user/user.model';
import { EntityManager } from '@mikro-orm/knex';
import { ID, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay/node/node';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly em: EntityManager) {}

  //   ------------------------------------- Queries -------------------------------------
  //   ------------------------------------- Mutations -------------------------------------
  //   ------------------------------------- Resolvers -------------------------------------
  @ResolveField(() => ID, { name: EOrderField.GlobalID })
  async resolveID(@Parent() order: Order): Promise<string> {
    return toGlobalId('Order', order.id);
  }

  @ResolveField(() => User, { name: EOrderField.PayerUser })
  async resolvePayerUser(@Parent() order: Order): Promise<UserEntity> {
    const orderEntity = await this.em.findOneOrFail(
      OrderEntity,
      { id: order.id },
      { populate: ['payerUser'] },
    );
    return orderEntity.payerUser.getEntity();
  }

  @ResolveField(() => Group, { name: EOrderField.Group })
  async resolveGroup(@Parent() order: Order): Promise<GroupEntity> {
    const orderEntity = await this.em.findOneOrFail(
      OrderEntity,
      { id: order.id },
      { populate: ['group'] },
    );
    return orderEntity.group.getEntity();
  }

  @ResolveField(() => [Transaction], { name: EOrderField.Transactions })
  async resolveTransactions(
    @Parent() order: Order,
  ): Promise<TransactionEntity[]> {
    const orderEntity = await this.em.findOneOrFail(
      OrderEntity,
      { id: order.id },
      { populate: ['transactions'] },
    );
    return orderEntity.transactions.getItems();
  }
}
