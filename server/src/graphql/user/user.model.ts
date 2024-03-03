import { UserEntity } from '@app/entities/main/user.entity';
import {
  GroupMemberConnection
} from '@app/graphql/groupMember/groupMember.model';
import { BaseNode, RelayNode } from '@app/graphql/node/node.model';
import { PageInfo } from '@app/relay/relay.graphql';
import { RelayConnection, RelayEdge } from '@app/relay/types';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { OrderConnection } from '@app/graphql/order/order.model';
import { TransactionConnection } from '@app/graphql/transaction/transaction.model';

/**
 * fields which match scalar entity fields don't need custom resolvers
 * this enum reflects additional fields like relationships or computed fields. The use of the enum itself is to ensure string value consistency between model and resolver.
 * */
export enum EUserField {
  OrdersPaid = 'ordersPaid',
  Transactions = 'transactions',
  Groups = 'groups',
}

@ObjectType({
  implements: () => [RelayNode],
})
export class User extends BaseNode {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String, { nullable: true })
  avatarURL?: string;

  @Field(() => OrderConnection)
  [EUserField.OrdersPaid]: OrderConnection;

  @Field(() => TransactionConnection)
  [EUserField.Transactions]: TransactionConnection;

  @Field(() => GroupMemberConnection)
  [EUserField.Groups]: GroupMemberConnection;
}

/* ================================= RELAY TYPES ======================================== */
@ObjectType(`UserEdge`, { isAbstract: true })
export class UserEdge implements RelayEdge<UserEntity> {
  @Field({ nullable: true })
  cursor: string;

  @Field(() => User, { nullable: true })
  node: UserEntity;
}

@ObjectType(`UserConnection`, { isAbstract: true })
export class UserConnection implements RelayConnection<UserEntity> {
  @Field(() => [UserEdge], { nullable: true })
  edges: UserEdge[];

  @Field(() => PageInfo, { nullable: true })
  pageInfo: PageInfo;
}

