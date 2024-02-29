import { GroupEntity } from '@app/entities/main/group.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { Group } from '@app/graphql/group/group.model';
import { RelayNode } from '@app/graphql/node/node.model';
import { Transaction } from '@app/graphql/transaction/transaction.model';
import { User } from '@app/graphql/user/user.model';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * fields which match scalar entity fields don't need custom resolvers
 * this enum reflects additional fields like relationships or computed fields. The use of the enum itself is to ensure string value consistency between model and resolver.
 * NOTE: id requires a resolver because it will be transformed to a globalID for Relay compatibility
 * */
enum EOrderFields {
  ID = 'id',
  PayerUserID = 'payerUserID',
  Group = 'group',
  Transactions = 'transactions',
}

@ObjectType({
  implements: () => [RelayNode],
})
export class Order extends RelayNode {
  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => User)
  [EOrderFields.PayerUserID]: UserEntity;

  @Field(() => Group)
  [EOrderFields.Group]: GroupEntity;

  @Field(() => [Transaction], { defaultValue: [] })
  [EOrderFields.Transactions]: TransactionEntity[];
}
