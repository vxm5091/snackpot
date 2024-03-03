import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { OrderEdge } from '@app/graphql/order/order.model';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
  UpdateTransactionsManyInput,
} from '@app/graphql/transaction/transaction.dto';
import {
  ETransactionField,
  Transaction,
  TransactionConnection,
  TransactionEdge,
} from '@app/graphql/transaction/transaction.model';
import { UserEdge } from '@app/graphql/user/user.model';
import { RelayService } from '@app/relay/relay.service';
import { TransactionService } from '@app/services/transaction/transaction.service';
import { EntityManager } from '@mikro-orm/knex';
import {
  Args,
  ID,
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
    private readonly transactionService: TransactionService,
    private readonly relayService: RelayService,
  ) {}

  //   ------------------------------------- Queries -------------------------------------
  @Query(() => Transaction, { name: 'transaction' })
  getTransaction(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<TransactionEntity> {
    return this.em.findOneOrFail(TransactionEntity, id);
  }
  //   ------------------------------------- Mutations -------------------------------------
  // We return an edge here because that makes it easier for Relay to append a newly created edge and re-render an array.
  @Mutation(() => TransactionEdge)
  async createTransaction(
    @Args('input', { type: () => CreateTransactionInput })
    input: CreateTransactionInput,
  ): Promise<TransactionEdge> {
    const res = await this.transactionService.createTransaction(input);
    return this.relayService.getEdge(res, 'Transaction');
  }

  // We return an edge here because that makes it easier for Relay to re-render a list because an array of elements is equivalent to a connection of edges.
  @Mutation(() => TransactionEdge)
  async updateTransaction(
    @Args('input', { type: () => UpdateTransactionInput })
    input: UpdateTransactionInput,
  ): Promise<TransactionEdge> {
    const res = await this.transactionService.updateTransaction(input);
    return this.relayService.getEdge(res, 'Transaction');
  }

  @Mutation(() => TransactionConnection)
  async updateTransactionsMany(
    @Args('input', { type: () => UpdateTransactionsManyInput })
    input: UpdateTransactionsManyInput,
  ): Promise<TransactionConnection> {
    const res = await this.transactionService.updateTransactionsMany(
      input.transactions,
    );
    return this.relayService.getConnection(res, 'Transaction');
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
      transactionEntity.recipient.getEntity(),
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
