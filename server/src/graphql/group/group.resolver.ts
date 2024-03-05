import { IContextGQL } from '@app/core/types/http.types';
import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { CreateGroupInput } from '@app/graphql/group/group.dto';
import { EGroupField, Group } from '@app/graphql/group/group.model';
import {
  GroupMemberConnection,
  GroupMemberEdge,
} from '@app/graphql/groupMember/groupMember.model';

import { OrderConnection, OrderEdge } from '@app/graphql/order/order.model';
import { ENodeType } from '@app/graphql/types';
import { UserEdge } from '@app/graphql/user/user.model';
import { RelayService } from '@app/relay/relay.service';
import { RelayConnection, RelayEdge } from '@app/relay/types';
import { GroupService } from '@app/services/group/group.service';
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

@Resolver(() => Group)
export class GroupResolver {
  constructor(
    private readonly em: EntityManager,
    private readonly groupService: GroupService,
    private readonly relayService: RelayService,
  ) {}

  //   ------------------------------------- Queries -------------------------------------
  @Query(() => Group, { name: 'group' })
  getGroup(@Args('id', { type: () => ID }) id: string): Promise<GroupEntity> {
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
  @ResolveField(() => GroupMemberConnection, { name: EGroupField.Members })
  async resolveMembers(@Parent() group: Group): Promise<GroupMemberConnection> {
    const res = await this.em.find(UserGroupJoinEntity, { group: group.id });
    return this.relayService.getConnection(res, ENodeType.GroupMember);
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
  async resolveOrders(@Parent() group: Group): Promise<RelayConnection<OrderEntity>> {
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
  async resolveActiveOrder(
    @Parent() group: Group,
  ): Promise<RelayEdge<OrderEntity> | null> {
    const res = await this.em.findOne(OrderEntity, {
      group: group.id,
      isActive: true,
    });

    if (!res) return null;

    return this.relayService.getEdge(res, 'Order');
  }

  @ResolveField(() => GroupMemberEdge, {
    name: EGroupField.Me,
  })
  async resolveMe(
    @Parent() group: Group,
    @Context() ctx: IContextGQL,
  ): Promise<GroupMemberEdge> {
    const userID = ctx.userEntity?.id;
    if (!userID) {
      throw new BadRequestException();
    }
    const res = await this.em.findOneOrFail(UserGroupJoinEntity, {
      group: group.id,
      user: userID,
    });
    return this.relayService.getEdge(res, ENodeType.GroupMember);
  }
}
