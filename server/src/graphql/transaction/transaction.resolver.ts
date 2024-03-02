import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { OrderEdge } from '@app/graphql/order/order.model';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '@app/graphql/transaction/transaction.dto';
import {
  ETransactionField,
  Transaction,
} from '@app/graphql/transaction/transaction.model';
import { UserEdge } from '@app/graphql/user/user.model';
import { RelayService } from '@app/relay/relay.service';
import { EntityManager } from '@mikro-orm/knex';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(
    private readonly em: EntityManager,
    private readonly relayService: RelayService,
  ) {}

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
  @ResolveField(() => UserEdge, { name: ETransactionField.Payer })
  async resolvePayer(@Parent() transaction: Transaction): Promise<UserEdge> {
    const transactionEntity = await this.em.findOneOrFail(
      TransactionEntity,
      { id: transaction.id },
      { populate: ['payer'] },
    );

    return this.relayService.getEdge(
      transactionEntity.payer.getEntity(),
      'User',
    );
  }

  @ResolveField(() => UserEdge, { name: ETransactionField.Recipient })
  async resolveRecipient(
    @Parent() transaction: Transaction,
  ): Promise<UserEdge> {
    const transactionEntity = await this.em.findOneOrFail(
      TransactionEntity,
      { id: transaction.id },
      { populate: ['recipient'] },
    );

    return this.relayService.getEdge(
      transactionEntity.payer.getEntity(),
      'User',
    );
  }

  @ResolveField(() => OrderEdge, { name: ETransactionField.Order })
  async resolveOrder(@Parent() transaction: Transaction): Promise<OrderEdge> {
    const transactionEntity = await this.em.findOneOrFail(
      TransactionEntity,
      { id: transaction.id },
      { populate: ['order'] },
    );

    return this.relayService.getEdge(
      transactionEntity.order.getEntity(),
      'Order',
    );
  }
}
