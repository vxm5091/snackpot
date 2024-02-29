import { GroupEntity } from '@app/entities/main/group.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { Group } from '@app/graphql/group/group.model';
import { BaseNode, RelayNode } from '@app/graphql/node/node.model';
import { Transaction } from '@app/graphql/transaction/transaction.model';
import { User } from '@app/graphql/user/user.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

/**
 * fields which match scalar entity fields don't need custom resolvers
 * this enum reflects additional fields like relationships or computed fields. The use of the enum itself is to ensure string value consistency between model and resolver.
 * */
export enum EOrderField {
  GlobalID = 'globalID',
  PayerUser = 'payerUser',
  Group = 'group',
  Transactions = 'transactions',
}

@ObjectType({
  implements: () => [RelayNode],
})
export class Order extends BaseNode {
  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => ID)
  [EOrderField.GlobalID]: string;

  @Field(() => User)
  [EOrderField.PayerUser]: UserEntity;

  @Field(() => Group)
  [EOrderField.Group]: GroupEntity;

  @Field(() => [Transaction], { defaultValue: [] })
  [EOrderField.Transactions]: TransactionEntity[];
}
