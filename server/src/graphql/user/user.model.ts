import { UserEntity } from '@app/entities/main/user.entity';
import { BaseNode, RelayNode } from '@app/graphql/node/node.model';
import { PageInfo } from '@app/relay/relay.graphql';
import { RelayConnection, RelayEdge } from '@app/relay/types';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { OrderConnection } from '@app/graphql/order/order.model';
import { TransactionConnection } from '@app/graphql/transaction/transaction.model';
import { GroupBalanceConnection } from '@app/graphql/group/group.model';

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
  [EUserField.OrdersPaid]: typeof OrderConnection;

  @Field(() => TransactionConnection)
  [EUserField.Transactions]: typeof TransactionConnection;

  @Field(() => GroupBalanceConnection)
  [EUserField.Groups]: GroupBalanceConnection;
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

// when traversing Group -> User, we want the edge to also include the user's balance
@ObjectType(`UserBalanceEdge`, { isAbstract: true })
export class UserBalanceEdge extends UserEdge {
  @Field(() => Float, { defaultValue: 0 })
  balance: number;
}

@ObjectType(`UserBalanceConnection`, { isAbstract: true })
export class UserBalanceConnection {
  @Field(() => [UserBalanceEdge], { nullable: true })
  edges: UserBalanceEdge[];

  @Field(() => PageInfo, { nullable: true })
  pageInfo: PageInfo;
}
