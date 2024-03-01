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
import { GroupService } from '@app/services/group/group.service';
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
  constructor(
    private readonly em: EntityManager,
    private readonly groupService: GroupService,
  ) {}

  //   ------------------------------------- Queries -------------------------------------
  //   ------------------------------------- Mutations -------------------------------------
  @Mutation(() => Group)
  async createGroup(
    @Args({ name: 'createGroupInput', type: () => CreateGroupInput })
    input: CreateGroupInput,
  ): Promise<GroupEntity> {
    const group = new GroupEntity({
      groupName: input.groupName,
      avatarURL: input.avatarURL,
    });
    this.em.persist(group);

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
    const groupData = await this.groupService.getGroupData(group.id);
    const userBalance =
      await this.groupService.getGroupMemberBalance(groupData);

    return groupData.usersJoin.map(({ user }) => {
      const member = new GroupMember();
      member[EGroupMemberField.User] = user.getEntity();
      member[EGroupMemberField.Balance] = userBalance[user.id];
      member[EGroupMemberField.Group] = groupData;
      return member;
    });
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
