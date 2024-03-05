
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
import { ENodeType, IContextGQL } from '@app/graphql/types';
import { UserEdge } from '@app/graphql/user/user.model';
import { RelayService } from '@app/relay/relay.service';
import { RelayConnection, RelayEdge } from '@app/relay/types';
import { GroupService } from '@app/services/group/group.service';
import { EntityManager } from '@mikro-orm/knex';
import { BadRequestException } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { fromGlobalId } from 'graphql-relay/node/node';

@Resolver(() => Group)
export class GroupResolver {
  constructor(
    private readonly em: EntityManager,
    private readonly groupService: GroupService,
    private readonly relayService: RelayService,
  ) {}

  //   ------------------------------------- Mutations -------------------------------------
  @Mutation(() => Group)
  async createGroup(
    @Args({ name: 'createGroupInput', type: () => CreateGroupInput })
    input: CreateGroupInput,
    @Context() ctx: IContextGQL,
  ): Promise<GroupEntity> {
    if (!ctx.userEntity) throw new BadRequestException('User not found');

    const group = this.em.create(GroupEntity, {
      groupName: input.groupName,
      avatarURL: input.avatarURL,
      owner: ctx.userEntity.id,
    });
    this.em.persist(group);

    await this.em.persistAndFlush(group);
    return group;
  }

  //   ------------------------------------- Resolvers -------------------------------------
  @ResolveField(() => GroupMemberConnection, { name: EGroupField.Members })
  async resolveMembers(@Parent() group: Group): Promise<GroupMemberConnection> {
    const groupID = fromGlobalId(group.globalID).id;
    const res = await this.em.find(UserGroupJoinEntity, { group: groupID });
    return this.relayService.getConnection(res, ENodeType.GroupMember);
  }

  @ResolveField(() => UserEdge, { name: EGroupField.Owner })
  async resolveOwner(@Parent() group: Group): Promise<UserEdge> {
    const groupID = fromGlobalId(group.globalID).id;
    const res = (await this.em.findOne(
      GroupEntity,
      { id: groupID },
      {
        populate: ['owner'],
      },
    )) as GroupEntity;

    return this.relayService.getEdge(res.owner, ENodeType.User);
  }

  @ResolveField(() => OrderConnection, { name: EGroupField.Orders })
  async resolveOrders(
    @Parent() group: Group,
  ): Promise<RelayConnection<OrderEntity>> {
    const groupID = fromGlobalId(group.globalID).id;

    const res = await this.em.find(
      OrderEntity,
      {
        group: groupID,
      },
      {
        orderBy: { createdAt: 'DESC' },
      },
    );

    return this.relayService.getConnection(res, ENodeType.Order);
  }

  @ResolveField(() => OrderEdge, {
    name: EGroupField.ActiveOrder,
    nullable: true,
  })
  async resolveActiveOrder(
    @Parent() group: Group,
  ): Promise<RelayEdge<OrderEntity> | null> {
    const groupID = fromGlobalId(group.globalID).id;
    const res = await this.em.findOne(OrderEntity, {
      group: groupID,
      isActive: true,
    });

    if (!res) return null;

    return this.relayService.getEdge(res, ENodeType.Order);
  }

  @ResolveField(() => GroupMemberEdge, {
    name: EGroupField.Me,
  })
  async resolveMe(
    @Parent() group: Group,
    @Context() ctx: IContextGQL,
  ): Promise<GroupMemberEdge> {
    const groupID = fromGlobalId(group.globalID).id;
    const userID = ctx.userEntity?.id;
    if (!userID) {
      throw new BadRequestException();
    }
    const res = await this.em.findOneOrFail(UserGroupJoinEntity, {
      group: groupID,
      user: userID,
    });
    return this.relayService.getEdge(res, ENodeType.GroupMember);
  }
}
