import { BaseEntity } from '@app/entities/abstract/base.entity';
import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  t,
} from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryKey()
  id!: string;

  @Property({ type: t.text })
  username!: string;

  @Property({ type: t.text })
  firstName!: string;

  @Property({ type: t.text })
  lastName!: string;

  @Property({ type: t.text })
  avatarURL?: string;

  @OneToMany({
    entity: () => OrderEntity,
    mappedBy: r => r.payerUserID,
  })
  ordersPaid = new Collection<OrderEntity>(this);

  @OneToMany({
    entity: () => TransactionEntity,
    mappedBy: r => r.user,
  })
  transactions = new Collection<TransactionEntity>(this);

  @OneToMany({
    entity: () => UserGroupJoinEntity,
    mappedBy: r => r.user,
  })
  groupsJoin = new Collection<UserGroupJoinEntity>(this);
}
