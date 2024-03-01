import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { Order } from '@app/graphql/order/order.model';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '@app/graphql/transaction/transaction.dto';
import {
  ETransactionField,
  Transaction,
} from '@app/graphql/transaction/transaction.model';
import { User } from '@app/graphql/user/user.model';
import { EntityManager } from '@mikro-orm/knex';
import {
  Args,
  ID,
  Mutation,
  Parent, Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay/node/node';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly em: EntityManager) {}

  //   ------------------------------------- Queries -------------------------------------
  @Query(() => Transaction, { name: 'transaction' })
  getTransaction(@Args('id') id: string): Promise<TransactionEntity> {
    return this.em.findOneOrFail(TransactionEntity, id);
  }
  //   ------------------------------------- Mutations -------------------------------------
  @Mutation(() => Transaction)
  async createTransaction(
    @Args('createTransactionInput') input: CreateTransactionInput,
  ): Promise<TransactionEntity> {
    const transaction = new TransactionEntity({
      itemName: input.itemName,
      itemPrice: input.itemPrice,
    });

    await this.em.persistAndFlush(transaction);
    return transaction;
  }

  @Mutation(() => Transaction)
  async updateTransaction(
    @Args('updateTransactionInput') input: UpdateTransactionInput,
  ): Promise<TransactionEntity> {
    const transaction = await this.em.findOneOrFail(TransactionEntity, {
      id: input.id,
    });

    transaction.itemName = input.itemName;
    transaction.itemPrice = input.itemPrice;

    await this.em.flush();
    return transaction;
  }

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
