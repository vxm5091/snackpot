import { IContextGQL } from '@app/core/types/http.types';
import { MENU_ITEMS } from '@app/data/seeders/constants';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { GroupEdge } from '@app/graphql/group/group.model';
import { GroupMemberEdge } from '@app/graphql/groupMember/groupMember.model';
import { OrderEdge } from '@app/graphql/order/order.model';
import {
  CreateTransactionInput,
  DeleteTransactionInput,
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
import { RelayConnection, RelayEdge } from '@app/relay/types';
import { TransactionService } from '@app/services/transaction/transaction.service';
import { faker } from '@faker-js/faker';
import { EntityManager } from '@mikro-orm/knex';
import { BadRequestException } from '@nestjs/common';
import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { fromGlobalId } from 'graphql-relay/node/node';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(
    private readonly em: EntityManager,
    private readonly transactionService: TransactionService,
    private readonly relayService: RelayService,
  ) {}

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
      throw new BadRequestException();
    }
    const res = await this.transactionService.createTransaction(input);
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
  ): Promise<RelayConnection<TransactionEntity>> {
    for (const txn of input.transactions) {
      txn.id = fromGlobalId(txn.id).id;
    }
    const res = await this.transactionService.updateTransactionsMany(
      input.transactions,
    );
    return this.relayService.getConnection(res, ENodeType.Transaction);
  }

  @Mutation(() => ID)
  async deleteTransaction(
    @Args('input', { type: () => DeleteTransactionInput })
    input: DeleteTransactionInput,
  ): Promise<string> {
    const entity = await this.em.findOneOrFail(TransactionEntity, {
      order: input.orderID,
      recipient: input.groupMemberID,
    });
    const entityGlobalID = entity.globalID;
    this.em.remove(entity);
    await this.em.flush();
    return entityGlobalID;
  }

  @Mutation(() => [TransactionEdge])
  async simulateTransactions(
    @Args('orderID', { type: () => ID }) orderGlobalID: string,
    @Context() ctx: IContextGQL,
  ): Promise<RelayEdge<TransactionEntity>[]> {
    if (!ctx.userEntity) {
      throw new BadRequestException();
    }

    const orderID = fromGlobalId(orderGlobalID).id;

    const orderEntity = await this.em.findOneOrFail(OrderEntity, orderID, {
      populate: ['group.usersJoin', 'transactions.recipient'],
    });

    const existingRecipientsID = orderEntity.transactions.reduce((acc, rec) => {
      acc[rec.recipient.id] = true;
      return acc;
    }, {});

    // create transaction entities for all group members who don't already have a transaction and who aren't me
    const transactionEntities = orderEntity.group.$.usersJoin.$.map(member => {
      if (
        existingRecipientsID[member.id] ||
        member.user.id === ctx.userEntity!.id
      ) {
        return null;
      }
      return this.em.create(TransactionEntity, {
        recipient: member,
        order: orderEntity,
        itemPrice: +faker.finance.amount({ min: 3, max: 10 }),
        itemName: MENU_ITEMS[Math.floor(Math.random() * MENU_ITEMS.length)],
      });
    }).filter(Boolean) as TransactionEntity[];

    await this.em.persistAndFlush(transactionEntities);
    const edges = transactionEntities.map(e =>
      this.relayService.getEdge(e, ENodeType.Transaction),
    );
    console.log('returning edges', edges);
    return edges;
  }

  //   ------------------------------------- Resolvers -------------------------------------
  @ResolveField(() => GroupMemberEdge, { name: ETransactionField.Recipient })
  async resolveRecipient(
    @Parent() transaction: Transaction,
  ): Promise<GroupMemberEdge> {
    const transactionID = fromGlobalId(transaction.globalID).id;
    const transactionEntity = await this.em.findOneOrFail(
      TransactionEntity,
      { id: transactionID },
      { populate: ['recipient'] },
    );

    return this.relayService.getEdge(
      transactionEntity.recipient.getEntity(),
      ENodeType.Transaction,
    );
  }

  @ResolveField(() => OrderEdge, { name: ETransactionField.Order })
  async resolveOrder(@Parent() transaction: Transaction): Promise<OrderEdge> {
    const transactionID = fromGlobalId(transaction.globalID).id;
    const transactionEntity = await this.em.findOneOrFail(
      TransactionEntity,
      { id: transactionID },
      { populate: ['order'] },
    );

    return this.relayService.getEdge(
      transactionEntity.order.getEntity(),
      ENodeType.Order,
    );
  }

  @ResolveField(() => GroupEdge, { name: ETransactionField.Group })
  async resolveGroup(@Parent() transaction: Transaction): Promise<GroupEdge> {
    const transactionID = fromGlobalId(transaction.globalID).id;
    const transactionEntity = await this.em.findOneOrFail(
      TransactionEntity,
      { id: transactionID },
      { populate: ['order.group'] },
    );

    return this.relayService.getEdge(
      transactionEntity.order.getEntity().group.getEntity(),
      ENodeType.Group,
    );
  }
}
