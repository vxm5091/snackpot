import { BaseEntity } from '@app/entities/abstract/base.entity';
import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import {
  Collection,
  Entity,
  Index,
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

  @Index()
  @OneToMany({
    entity: () => OrderEntity,
    mappedBy: r => r.payerUser,
  })
  ordersPaid = new Collection<OrderEntity>(this);

  @Index()
  @OneToMany({
    entity: () => TransactionEntity,
    mappedBy: r => r.user,
  })
  transactions = new Collection<TransactionEntity>(this);

  @Index()
  @OneToMany({
    entity: () => UserGroupJoinEntity,
    mappedBy: r => r.user,
  })
  groupsJoin = new Collection<UserGroupJoinEntity>(this);

  @Index()
  @OneToMany({
    entity: () => GroupEntity,
    mappedBy: r => r.owner,
  })
  groupsOwned = new Collection<GroupEntity>(this);
}
