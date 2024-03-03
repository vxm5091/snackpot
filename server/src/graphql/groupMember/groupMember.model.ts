import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { GroupEdge } from '@app/graphql/group/group.model';
import { BaseNode, RelayNode } from '@app/graphql/node/node.model';
import { TransactionConnection } from '@app/graphql/transaction/transaction.model';
import { UserEdge } from '@app/graphql/user/user.model';
import { PageInfo } from '@app/relay/relay.graphql';
import { RelayConnection, RelayEdge } from '@app/relay/types';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import Relay from 'graphql-relay';

/**
 * fields which match scalar entity fields don't need custom resolvers
 * this enum reflects additional fields like relationships or computed fields. The use of the enum itself is to ensure string value consistency between model and resolver.
 * */
export enum EGroupMemberField {
  User = 'user',
  Group = 'group',
  Transactions = 'transactions',
  Balance = 'balance',
}

@ObjectType({
  implements: () => [RelayNode],
})
export class GroupMember extends BaseNode {
  @Field(() => UserEdge)
  [EGroupMemberField.User]: UserEdge;

  @Field(() => GroupEdge)
  [EGroupMemberField.Group]: GroupEdge;

  @Field(() => TransactionConnection)
  [EGroupMemberField.Transactions]: TransactionConnection;

  @Field(() => Float)
  [EGroupMemberField.Balance]: number;
}

/* ================================= RELAY TYPES ======================================== */
@ObjectType(`GroupMemberEdge`, { isAbstract: true })
export class GroupMemberEdge implements RelayEdge<UserGroupJoinEntity> {
  @Field({ nullable: true })
  cursor: Relay.ConnectionCursor;

  @Field(() => GroupMember, { nullable: true })
  node: UserGroupJoinEntity;
}

@ObjectType(`GroupMemberConnection`, { isAbstract: true })
export class GroupMemberConnection
  implements RelayConnection<UserGroupJoinEntity>
{
  @Field(() => [GroupMemberEdge])
  edges: GroupMemberEdge[];

  @Field(() => PageInfo)
  pageInfo: Relay.PageInfo;
}

