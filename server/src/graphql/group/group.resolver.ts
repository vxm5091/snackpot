import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { CreateGroupInput } from '@app/graphql/group/group.dto';
import { EGroupField, Group } from '@app/graphql/group/group.model';

import { OrderConnection, OrderEdge } from '@app/graphql/order/order.model';
import { UserBalanceConnection, UserEdge } from '@app/graphql/user/user.model';
import { RelayService } from '@app/relay/relay.service';
import { RelayEdge } from '@app/relay/types';
import { GroupService } from '@app/services/group/group.service';
import { EntityManager } from '@mikro-orm/knex';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

@Resolver(() => Group)
export class GroupResolver {
  constructor(
    private readonly em: EntityManager,
    private readonly groupService: GroupService,
    private readonly relayService: RelayService,
  ) {}

  //   ------------------------------------- Queries -------------------------------------
  @Query(() => Group, { name: 'group' })
  getGroup(@Args('id') id: string): Promise<GroupEntity> {
    return this.em.findOneOrFail(GroupEntity, id);
  }

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
  @ResolveField(() => UserBalanceConnection, { name: EGroupField.Members })
  async resolveMembers(@Parent() group: Group): Promise<UserBalanceConnection> {
    const members = await this.groupService.getGroupMembers(group.id);
    const memberBalance = await this.groupService.getGroupMemberBalanceAll(
      group.id,
    );

    const edges = members.map(member => {
      const regularEdge = this.relayService.getEdge(member, 'User');
      return {
        ...regularEdge,
        balance: memberBalance?.[member.id] || 0,
      };
    });

    return {
      edges,
      pageInfo: this.relayService.getPageInfo(edges),
    };
  }

  @ResolveField(() => UserEdge, { name: EGroupField.Owner })
  async resolveOwner(@Parent() group: Group): Promise<UserEdge> {
    const res = (await this.em.findOne(
      GroupEntity,
      { id: group.id },
      {
        populate: ['owner'],
      },
    )) as GroupEntity;

    return this.relayService.getEdge(res.owner, 'User');
  }

  @ResolveField(() => OrderConnection, { name: EGroupField.Orders })
  async resolveOrders(@Parent() group: Group): Promise<OrderConnection> {
    const res = (await this.em.findOne(
      GroupEntity,
      { id: group.id },
      {
        populate: ['orders'],
      },
    )) as GroupEntity;

    return this.relayService.getConnection(res.orders.getItems(), 'Order');
  }

  @ResolveField(() => OrderEdge, {
    name: EGroupField.ActiveOrder,
    nullable: true,
  })
  async resolveActiveOrder(@Parent() group: Group): Promise<OrderEdge | null> {
    const res = await this.em.findOne(OrderEntity, {
      group: group.id,
      isActive: true,
    });

    return this.relayService.getEdge(res, 'Order');
  }
}
