import { IContextGQL } from '@app/core/types/http.types';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { GroupEdge } from '@app/graphql/group/group.model';
import { GroupMemberEdge } from '@app/graphql/groupMember/groupMember.model';
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
import { ENodeType } from '@app/graphql/types';
import { RelayService } from '@app/relay/relay.service';
import { TransactionService } from '@app/services/transaction/transaction.service';
import { EntityManager } from '@mikro-orm/knex';
import { BadRequestException } from '@nestjs/common';
import {
  Args,
  Context,
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
    @Context() ctx: IContextGQL,
  ): Promise<TransactionEdge> {
    if (!ctx.userEntity) {
      // TODO convert to graphQL error
      throw new BadRequestException()
    }
    const res = await this.transactionService.createTransaction(
      input,
      ctx.userEntity.id,
    );
    return this.relayService.getEdge(res, ENodeType.Transaction);
  }

  @Mutation(() => TransactionEdge)
  async updateTransaction(
    @Args('input', { type: () => UpdateTransactionInput })
    input: UpdateTransactionInput,
  ): Promise<TransactionEdge> {
    const res = await this.transactionService.updateTransaction(input);
    return this.relayService.getEdge(res, ENodeType.Transaction);
  }

  @Mutation(() => TransactionConnection)
  async updateTransactionsMany(
    @Args('input', { type: () => UpdateTransactionsManyInput })
    input: UpdateTransactionsManyInput,
  ): Promise<TransactionConnection> {
    const res = await this.transactionService.updateTransactionsMany(
      input.transactions,
    );
    return this.relayService.getConnection(res, ENodeType.Transaction);
  }

  //   ------------------------------------- Resolvers -------------------------------------
  @ResolveField(() => GroupMemberEdge, { name: ETransactionField.Payer })
  async resolvePayer(
    @Parent() transaction: Transaction,
  ): Promise<GroupMemberEdge> {
    const transactionEntity = await this.em.findOneOrFail(
      TransactionEntity,
      { id: transaction.id },
      { populate: ['payer'] },
    );

    return this.relayService.getEdge(
      transactionEntity.payer.getEntity(),
      ENodeType.GroupMember,
    );
  }

  @ResolveField(() => GroupMemberEdge, { name: ETransactionField.Recipient })
  async resolveRecipient(
    @Parent() transaction: Transaction,
  ): Promise<GroupMemberEdge> {
    const transactionEntity = await this.em.findOneOrFail(
      TransactionEntity,
      { id: transaction.id },
      { populate: ['recipient'] },
    );

    return this.relayService.getEdge(
      transactionEntity.recipient.getEntity(),
      ENodeType.Transaction,
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
      ENodeType.Order,
    );
  }

  @ResolveField(() => GroupEdge, { name: ETransactionField.Group })
  async resolveGroup(@Parent() transaction: Transaction): Promise<GroupEdge> {
    const transactionEntity = await this.em.findOneOrFail(
      TransactionEntity,
      { id: transaction.id },
      { populate: ['order.group'] },
    );

    return this.relayService.getEdge(
      transactionEntity.order.getEntity().group.getEntity(),
      ENodeType.Group,
    );
  }
}
