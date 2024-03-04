import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { GroupEdge } from '@app/graphql/group/group.model';
import { GroupMemberEdge } from '@app/graphql/groupMember/groupMember.model';
import { BaseNode, RelayNode } from '@app/graphql/node/node.model';
import { OrderEdge } from '@app/graphql/order/order.model';
import { UserEdge } from '@app/graphql/user/user.model';
import { PageInfo } from '@app/relay/relay.graphql';
import { RelayConnection, RelayEdge } from '@app/relay/types';
import { Field, Float, ObjectType } from '@nestjs/graphql';

/**
 * fields which match scalar entity fields don't need custom resolvers
 * this enum reflects additional fields like relationships or computed fields. The use of the enum itself is to ensure string value consistency between model and resolver.
 * */
export enum ETransactionField {
  Payer = 'payer',
  Recipient = 'recipient',
  Order = 'order',
  Group = 'group',
}

@ObjectType({
  implements: () => [RelayNode],
})
export class Transaction extends BaseNode {
  @Field(() => String)
  itemName: string;

  @Field(() => Float, { nullable: true })
  itemPrice?: number;

  @Field(() => GroupMemberEdge)
  [ETransactionField.Payer]: GroupMemberEdge;

  @Field(() => GroupMemberEdge)
  [ETransactionField.Recipient]: GroupMemberEdge;

  @Field(() => OrderEdge)
  [ETransactionField.Order]: OrderEdge;
  
  @Field(() => GroupEdge)
  [ETransactionField.Group]: GroupEdge;
}

/* ================================= RELAY TYPES ======================================== */
@ObjectType(`TransactionEdge`, { isAbstract: true })
export class TransactionEdge implements RelayEdge<TransactionEntity> {
  @Field({ nullable: true })
  cursor: string;

  @Field(() => Transaction, { nullable: true })
  node: TransactionEntity;
}

@ObjectType(`TransactionConnection`, { isAbstract: true })
export class TransactionConnection
  implements RelayConnection<TransactionEntity>
{
  @Field(() => [TransactionEdge], { nullable: true })
  edges: TransactionEdge[];

  @Field(() => PageInfo, { nullable: true })
  pageInfo: PageInfo;
}
