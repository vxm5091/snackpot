import { BaseEntity } from '@app/entities/abstract/base.entity';
import { GroupEntity } from '@app/entities/main/group.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import {
  Collection,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  Opt,
  Property,
  ref,
  Ref,
} from '@mikro-orm/core';
import { toGlobalId } from 'graphql-relay/node/node';

/*
 * Collective group purchase.
 * */
@Entity({ tableName: 'orders' })
export class OrderEntity extends BaseEntity {
  @Property({
    persist: false,
  })
  get globalID() {
    return this.id ? toGlobalId('Order', this.id) : '';
  }

  @Property()
  isActive: boolean & Opt = true;

  @Index()
  @ManyToOne({ entity: () => UserEntity })
  payer!: Ref<UserEntity>;

  @Index()
  @ManyToOne({ entity: () => GroupEntity })
  group!: Ref<GroupEntity>;

  @Index()
  @OneToMany({ entity: () => TransactionEntity, mappedBy: r => r.order })
  transactions = new Collection<TransactionEntity>(this);

  constructor(groupID: string) {
    super();
    this.group = ref(GroupEntity, groupID);
  }
}
