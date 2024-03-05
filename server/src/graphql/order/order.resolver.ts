import { IContextGQL } from '@app/core/types/http.types';
import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { GroupEdge } from '@app/graphql/group/group.model';
import { GroupMemberEdge } from '@app/graphql/groupMember/groupMember.model';
import { UpdateOrderInput } from '@app/graphql/order/order.dto';
import { EOrderField, Order, OrderEdge } from '@app/graphql/order/order.model';
import { TransactionConnection } from '@app/graphql/transaction/transaction.model';
import { ENodeType } from '@app/graphql/types';
import { RelayService } from '@app/relay/relay.service';
import { RelayConnection } from '@app/relay/types';
import { GroupService } from '@app/services/group/group.service';
import { ref } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/knex';
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

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly em: EntityManager,
    private readonly groupService: GroupService,
    private readonly relayService: RelayService,
  ) {}

  //   ------------------------------------- Queries -------------------------------------
  @Query(() => Order, { name: 'order' })
  async getOrder(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<OrderEntity> {
    return await this.em.findOneOrFail(OrderEntity, id);
  }
  //   ------------------------------------- Mutations -------------------------------------
  // We return an edge here because that makes it easier for Relay to re-render a list because an array of elements is equivalent to a connection of edges.
  @Mutation(() => OrderEdge)
  async createOrder(
    @Context() { userEntity }: IContextGQL,
    @Args('groupID', { type: () => ID }) groupID: string,
  ): Promise<OrderEdge> {
    // check if there is an active order -> if so, return that order
    const activeOrder = await this.em.findOne(OrderEntity, {
      group: groupID,
      isActive: true,
    });

    let entity: OrderEntity;

    if (activeOrder) {
      entity = activeOrder;
    } else {
      const orderEntity = new OrderEntity(groupID);

      // determine paying user
      const memberBalances =
        await this.groupService.getGroupMemberBalanceAll(groupID);
      const payerUser = Object.entries(memberBalances).reduce((a, b) =>
        a[1] < b[1] ? a : b,
      )[0];
      orderEntity.payer = ref(UserGroupJoinEntity, payerUser);

      await this.em.persistAndFlush(orderEntity);
      entity = orderEntity;
    }
    return this.relayService.getEdge(entity, ENodeType.Order);
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('input', { type: () => UpdateOrderInput }) input: UpdateOrderInput,
  ): Promise<OrderEntity> {
    const orderEntity = await this.em.findOneOrFail(OrderEntity, {
      id: input.id,
    });
    orderEntity.isActive = input.isActive;
    await this.em.flush();
    return orderEntity;
  }

  //   ------------------------------------- Resolvers -------------------------------------
  @ResolveField(() => GroupMemberEdge, { name: EOrderField.Payer })
  async resolvePayer(@Parent() order: Order): Promise<GroupMemberEdge> {
    const orderEntity = await this.em.findOneOrFail(
      OrderEntity,
      { id: order.id },
      { populate: ['payer'] },
    );
    return this.relayService.getEdge(orderEntity.payer.getEntity(), 'User');
  }

  @ResolveField(() => GroupEdge, { name: EOrderField.Group })
  async resolveGroup(@Parent() order: Order): Promise<GroupEdge> {
    const orderEntity = await this.em.findOneOrFail(
      OrderEntity,
      { id: order.id },
      { populate: ['group'] },
    );
    return this.relayService.getEdge(orderEntity.group.getEntity(), 'Group');
  }

  @ResolveField(() => TransactionConnection, { name: EOrderField.Transactions })
  async resolveTransactions(
    @Parent() order: Order,
  ): Promise<RelayConnection<TransactionEntity>> {
    const orderEntity = await this.em.findOneOrFail(
      OrderEntity,
      { id: order.id },
      { populate: ['transactions'] },
    );
    return this.relayService.getConnection(
      orderEntity.transactions.getItems(),
      'Transaction',
    );
  }
}
