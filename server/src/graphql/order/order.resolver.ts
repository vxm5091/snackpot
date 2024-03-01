import { IContextGQL } from '@app/core/types/http.types';
import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { Group } from '@app/graphql/group/group.model';
import { UpdateOrderInput } from '@app/graphql/order/order.dto';
import { EOrderField, Order } from '@app/graphql/order/order.model';
import { Transaction } from '@app/graphql/transaction/transaction.model';
import { User } from '@app/graphql/user/user.model';
import { GroupService } from '@app/services/group/group.service';
import { ref } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/knex';
import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay/node/node';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly em: EntityManager,
    private readonly groupService: GroupService,
  ) {}

  //   ------------------------------------- Queries -------------------------------------
  //   ------------------------------------- Mutations -------------------------------------
  @Mutation(() => Order)
  async createOrder(
    @Context() { userEntity }: IContextGQL,
    @Args('groupID') groupID: string,
  ): Promise<OrderEntity> {
    // check if there is an active order -> if so, return that order
    const activeOrder = await this.em.findOne(OrderEntity, {
      group: groupID,
      isActive: true,
    });
    if (activeOrder) {
      return activeOrder;
    }

    const orderEntity = new OrderEntity(groupID);

    // determine paying user
    const groupData = await this.groupService.getGroupData(groupID);
    const memberBalances =
      await this.groupService.getGroupMemberBalance(groupData);
    const payerUser = Object.entries(memberBalances).reduce((a, b) =>
      a[1] < b[1] ? a : b,
    )[0];
    orderEntity.payerUser = ref(UserEntity, payerUser);

    await this.em.persistAndFlush(orderEntity);
    return orderEntity;
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('updateOrderInput') input: UpdateOrderInput,
  ): Promise<OrderEntity> {
    const orderEntity = await this.em.findOneOrFail(OrderEntity, {
      id: input.id,
    });
    orderEntity.isActive = input.isActive;
    await this.em.flush()
    return orderEntity;
  }

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
