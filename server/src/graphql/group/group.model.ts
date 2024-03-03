import { GroupEntity } from '@app/entities/main/group.entity';
import {
  GroupMemberConnection
} from '@app/graphql/groupMember/groupMember.model';
import { BaseNode, RelayNode } from '@app/graphql/node/node.model';
import { OrderConnection, OrderEdge } from '@app/graphql/order/order.model';
import { UserEdge } from '@app/graphql/user/user.model';
import { PageInfo } from '@app/relay/relay.graphql';
import { RelayConnection, RelayEdge } from '@app/relay/types';
import { Field, ObjectType } from '@nestjs/graphql';
import * as Relay from 'graphql-relay/index';

/**
 * fields which match scalar entity fields don't need custom resolvers
 * this enum reflects additional fields like relationships or computed fields. The use of the enum itself is to ensure string value consistency between model and resolver.
 * */
export enum EGroupField {
  Members = 'members',
  Owner = 'owner',
  Orders = 'orders',
  ActiveOrder = 'activeOrder',
}

@ObjectType({
  implements: () => [RelayNode],
})
export class Group extends BaseNode {
  @Field(() => String)
  groupName: string;

  @Field(() => String, { nullable: true })
  avatarURL?: string;

  @Field(() => GroupMemberConnection)
  [EGroupField.Members]: GroupMemberConnection;

  @Field(() => UserEdge)
  [EGroupField.Owner]: UserEdge;

  @Field(() => OrderConnection)
  [EGroupField.Orders]: OrderConnection;

  @Field(() => OrderEdge, { nullable: true })
  [EGroupField.ActiveOrder]?: OrderEdge;
}

/* ================================= RELAY TYPES ======================================== */
@ObjectType(`GroupEdge`, { isAbstract: true })
export class GroupEdge implements RelayEdge<GroupEntity> {
  @Field({ nullable: true })
  cursor: Relay.ConnectionCursor;

  @Field(() => Group, { nullable: true })
  node: GroupEntity;
}

@ObjectType(`GroupConnection`, { isAbstract: true })
export class GroupConnection implements RelayConnection<GroupEntity> {
  @Field(() => [GroupEdge], { nullable: true })
  edges: RelayEdge<GroupEntity>[];

  @Field(() => PageInfo)
  pageInfo: Relay.PageInfo;
}
