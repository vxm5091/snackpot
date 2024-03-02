import { TransactionEntity } from '@app/entities/main/transaction.entity';
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
}

@ObjectType({
  implements: () => [RelayNode],
})
export class Transaction extends BaseNode {
  @Field(() => String)
  itemName: string;

  @Field(() => Float, { nullable: true })
  itemPrice?: number;

  @Field(() => UserEdge)
  [ETransactionField.Payer]: UserEdge;

  @Field(() => UserEdge)
  [ETransactionField.Recipient]: UserEdge;

  @Field(() => OrderEdge)
  [ETransactionField.Order]: OrderEdge;
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
