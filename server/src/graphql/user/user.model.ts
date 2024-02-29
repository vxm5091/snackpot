import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { BaseNode, RelayNode } from '@app/graphql/node/node.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Order } from '@app/graphql/order/order.model';
import { Transaction } from '@app/graphql/transaction/transaction.model';
import { Group } from '@app/graphql/group/group.model';

/**
 * fields which match scalar entity fields don't need custom resolvers
 * this enum reflects additional fields like relationships or computed fields. The use of the enum itself is to ensure string value consistency between model and resolver.
 * */
export enum EUserField {
  GlobalID = 'globalID',
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

  @Field(() => ID)
  [EUserField.GlobalID]: string;

  @Field(() => [Order], { defaultValue: [] })
  [EUserField.OrdersPaid]: OrderEntity[];

  @Field(() => [Transaction], { defaultValue: [] })
  [EUserField.Transactions]: TransactionEntity[];

  @Field(() => [Group], { defaultValue: [] })
  [EUserField.Groups]: GroupEntity[];
}
