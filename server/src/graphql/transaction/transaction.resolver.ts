import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { Order } from '@app/graphql/order/order.model';
import {
  ETransactionField,
  Transaction,
} from '@app/graphql/transaction/transaction.model';
import { User } from '@app/graphql/user/user.model';
import { EntityManager } from '@mikro-orm/knex';
import { ID, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay/node/node';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly em: EntityManager) {}

  //   ------------------------------------- Queries -------------------------------------
  //   ------------------------------------- Mutations -------------------------------------
  //   ------------------------------------- Resolvers -------------------------------------
  @ResolveField(() => ID, { name: ETransactionField.GlobalID })
  async resolveID(@Parent() transaction: Transaction): Promise<string> {
    return toGlobalId('Transaction', transaction.id);
  }

  @ResolveField(() => User, { name: ETransactionField.User })
  async resolveUser(@Parent() transaction: Transaction): Promise<UserEntity> {
    const transactionEntity = await this.em.findOneOrFail(
      TransactionEntity,
      { id: transaction.id },
      { populate: ['user'] },
    );

    return transactionEntity.user.getEntity();
  }
  
  @ResolveField(() => Order, { name: ETransactionField.Order })
  async resolveOrder(@Parent() transaction: Transaction): Promise<OrderEntity> {
    const transactionEntity = await this.em.findOneOrFail(
      TransactionEntity,
      { id: transaction.id },
      { populate: ['order'] },
    );

    return transactionEntity.order.getEntity();
  }
}
