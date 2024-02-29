import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { CreateGroupInput } from '@app/graphql/group/group.dto';
import { EGroupField, Group } from '@app/graphql/group/group.model';
import {
  EGroupMemberField,
  GroupMember,
} from '@app/graphql/groupMember/groupMember.model';
import { Order } from '@app/graphql/order/order.model';
import { User } from '@app/graphql/user/user.model';
import { EntityManager } from '@mikro-orm/knex';
import {
  Args,
  ID,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay/node/node';

@Resolver(() => Group)
export class GroupResolver {
  constructor(private readonly em: EntityManager) {}

  //   ------------------------------------- Queries -------------------------------------
  //   ------------------------------------- Mutations -------------------------------------
  @Mutation(() => Group)
  async createGroup(
    @Args({ name: 'createGroupInput', type: () => CreateGroupInput })
    input: CreateGroupInput,
  ): Promise<GroupEntity> {
    const group = new GroupEntity()
    group.groupName = input.groupName;
    group.avatarURL = input.avatarURL;
    await this.em.persistAndFlush(group);
    return group;
  }

  //   ------------------------------------- Resolvers -------------------------------------
  @ResolveField(() => ID, { name: EGroupField.GlobalID })
  async resolveID(@Parent() group: Group): Promise<string> {
    return toGlobalId('Group', group.id);
  }

  @ResolveField(() => [GroupMember], { name: EGroupField.Members })
  async resolveMembers(@Parent() group: Group): Promise<GroupMember[]> {
    //   query DB for users in group + orders + transactions
    const res = (await this.em.findOne(
      GroupEntity,
      { id: group.id },
      {
        populate: ['usersJoin.user', 'orders.transactions'],
      },
    )) as GroupEntity;

    const userBalance = res.usersJoin.reduce(
      (acc, user) => {
        acc[user.user.id] = 0;
        return acc;
      },
      {} as Record<string, number>,
    );

    //   calculate balance for each user
    //   for each user in the group
    //   if the user paid for the order -- add all other users' amount to user's balance
    //   if the user did not pay for order -- subtract user amount for balance
    res.orders.getItems().forEach(order => {
      const payerUserID = order.payerUser.id;
      let payerUserBalance = 0;
      order.transactions.getItems().forEach(transaction => {
        if (transaction.user.id !== order.payerUser.id) {
          payerUserBalance += transaction.itemPrice;
          userBalance[payerUserID] -= transaction.itemPrice;
        }
      });

      userBalance[payerUserID] += payerUserBalance;
    });

    const groupMembers = res.usersJoin.map(({ user }) => {
      const member = new GroupMember();
      member[EGroupMemberField.User] = user;
      member[EGroupMemberField.Balance] = userBalance[user.id];
      member[EGroupMemberField.Group] = res;
      return member;
    });

    return groupMembers;
  }

  @ResolveField(() => User, { name: EGroupField.Owner })
  async resolveOwner(@Parent() group: Group): Promise<UserEntity> {
    const res = (await this.em.findOne(
      GroupEntity,
      { id: group.id },
      {
        populate: ['owner'],
      },
    )) as GroupEntity;

    return res.owner;
  }

  @ResolveField(() => [Order], { name: EGroupField.Orders })
  async resolveOrders(@Parent() group: Group): Promise<OrderEntity[]> {
    const res = (await this.em.findOne(
      GroupEntity,
      { id: group.id },
      {
        populate: ['orders'],
      },
    )) as GroupEntity;

    return res.orders.getItems();
  }

  @ResolveField(() => Order, { name: EGroupField.ActiveOrder, nullable: true })
  async resolveActiveOrder(
    @Parent() group: Group,
  ): Promise<OrderEntity | null> {
    return this.em.findOne(OrderEntity, {
      group: group.id,
      isActive: true,
    });
  }
}
