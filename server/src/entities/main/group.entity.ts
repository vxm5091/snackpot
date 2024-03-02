import { BaseEntity } from '@app/entities/abstract/base.entity';
import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import {
  Collection,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  Property,
  t,
} from '@mikro-orm/core';

@Entity({ tableName: 'groups' })
export class GroupEntity extends BaseEntity {
  @Property({ type: t.text })
  groupName!: string;

  @Property({ type: t.text })
  avatarURL?: string;

  @Index()
  @OneToMany({
    entity: () => UserGroupJoinEntity,
    mappedBy: r => r.group,
  })
  usersJoin = new Collection<UserGroupJoinEntity>(this);

  @Index()
  @OneToMany({
    entity: () => OrderEntity,
    mappedBy: r => r.group,
  })
  orders = new Collection<OrderEntity>(this);

  @Index()
  @OneToMany({
    entity: () => TransactionEntity,
    mappedBy: r => r.group,
  })
  transactions = new Collection<TransactionEntity>(this);

  @Index()
  @ManyToOne({
    entity: () => UserEntity,
  })
  owner!: UserEntity;

  constructor({
    groupName,
    avatarURL,
  }: {
    groupName: string;
    avatarURL?: string;
  }) {
    super();
    this.groupName = groupName;
    this.avatarURL = avatarURL;
  }
}
