import { OrderEntity } from '@app/entities/main/order.entity';
import { GroupEdge } from '@app/graphql/group/group.model';
import { GroupMemberEdge } from '@app/graphql/groupMember/groupMember.model';
import { BaseNode, RelayNode } from '@app/graphql/node/node.model';
import { TransactionConnection } from '@app/graphql/transaction/transaction.model';
import { PageInfo } from '@app/relay/relay.graphql';
import { RelayConnection, RelayEdge } from '@app/relay/types';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * fields which match scalar entity fields don't need custom resolvers
 * this enum reflects additional fields like relationships or computed fields. The use of the enum itself is to ensure string value consistency between model and resolver.
 * */
export enum EOrderField {
  Payer = 'payer',
  Group = 'group',
  Transactions = 'transactions',
}

@ObjectType({
  implements: () => [RelayNode],
})
export class Order extends BaseNode {
  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => GroupMemberEdge)
  [EOrderField.Payer]: GroupMemberEdge;

  @Field(() => GroupEdge)
  [EOrderField.Group]: GroupEdge;

  @Field(() => TransactionConnection)
  [EOrderField.Transactions]: TransactionConnection;
}

/* ================================= RELAY TYPES ======================================== */
@ObjectType(`OrderEdge`, { isAbstract: true })
export class OrderEdge implements RelayEdge<OrderEntity> {
  @Field({ nullable: true })
  cursor: string;

  @Field(() => Order, { nullable: true })
  node: OrderEntity;
}

@ObjectType(`OrderConnection`, { isAbstract: true })
export class OrderConnection implements RelayConnection<OrderEntity> {
  @Field(() => [OrderEdge], { nullable: true })
  edges: OrderEdge[];

  @Field(() => PageInfo, { nullable: true })
  pageInfo: PageInfo;
}
