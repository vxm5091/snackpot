import { OrderEntity } from '@app/entities/main/order.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { BaseNode, RelayNode } from '@app/graphql/node/node.model';
import { Order } from '@app/graphql/order/order.model';
import { User } from '@app/graphql/user/user.model';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

/**
 * fields which match scalar entity fields don't need custom resolvers
 * this enum reflects additional fields like relationships or computed fields. The use of the enum itself is to ensure string value consistency between model and resolver.
 * */
export enum ETransactionField {
  GlobalID = 'globalID',
  User = 'user',
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

  @Field(() => ID)
  [ETransactionField.GlobalID]: string;

  @Field(() => User)
  [ETransactionField.User]: UserEntity;

  @Field(() => Order)
  [ETransactionField.Order]: OrderEntity;
}
