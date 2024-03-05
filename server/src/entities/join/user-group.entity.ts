import { BaseEntity } from '@app/entities/abstract/base.entity';
import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { ENodeType } from '@app/graphql/types';
import {
  Collection,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  OptionalProps,
  Property,
  Ref,
  ref,
} from '@mikro-orm/core';
import { toGlobalId } from 'graphql-relay/node/node';

@Entity({
  tableName: 'users_groups',
})
export class UserGroupJoinEntity extends BaseEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt' | 'id' | 'globalID';

  @Index()
  @ManyToOne({
    entity: () => UserEntity,
  })
  user!: Ref<UserEntity>;

  @Index()
  @ManyToOne({
    entity: () => GroupEntity,
  })
  group!: Ref<GroupEntity>;

  @Index()
  @OneToMany({
    entity: () => TransactionEntity,
    mappedBy: r => r.recipient,
  })
  transactionsReceived = new Collection<TransactionEntity>(this);

  @Index()
  @OneToMany({
    entity: () => OrderEntity,
    mappedBy: r => r.payer,
  })
  ordersPaid = new Collection<OrderEntity>(this);

  @Property({
    persist: false,
  })
  get globalID() {
    return this.id ? toGlobalId(ENodeType.GroupMember, this.id) : '';
  }

  constructor(userID: string, groupID: string) {
    super();
    this.user = ref(UserEntity, userID);
    this.group = ref(GroupEntity, groupID);
  }
}
