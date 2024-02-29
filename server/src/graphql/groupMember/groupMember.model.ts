import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { BaseNode, RelayNode } from '@app/graphql/node/node.model';
import { User } from '@app/graphql/user/user.model';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Order } from '@app/graphql/order/order.model';
import { Transaction } from '@app/graphql/transaction/transaction.model';
import { Group } from '@app/graphql/group/group.model';

/**
 * fields which match scalar entity fields don't need custom resolvers
 * this enum reflects additional fields like relationships or computed fields. The use of the enum itself is to ensure string value consistency between model and resolver.
 * NOTE: id requires a resolver because it will be transformed to a globalID for Relay compatibility
 * */
export enum EGroupMemberField {
  Group = 'group',
  User = 'user',
  Balance = 'balance',
}

@ObjectType()
export class GroupMember {
  @Field(() => Group)
  [EGroupMemberField.Group]: GroupEntity;

  @Field(() => User)
  [EGroupMemberField.User]: UserEntity;

  @Field(() => Float)
  [EGroupMemberField.Balance]: number;
}
