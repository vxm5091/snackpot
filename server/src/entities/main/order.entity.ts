import { BaseEntity } from '@app/entities/abstract/base.entity';
import { GroupEntity } from '@app/entities/main/group.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import {
  Collection,
  Entity,
  Index,
  ManyToOne,
  OneToMany, Opt, Property,
  Ref,
} from '@mikro-orm/core';

/*
 * Collective group purchase.
 * */
@Entity({ tableName: 'orders' })
export class OrderEntity extends BaseEntity {
  @Property()
  isActive: boolean & Opt = true;
  
  @Index()
  @ManyToOne({ entity: () => UserEntity })
  payerUserID!: Ref<UserEntity>;

  @Index()
  @ManyToOne({ entity: () => GroupEntity })
  group!: Ref<GroupEntity>;

  @Index()
  @OneToMany({ entity: () => TransactionEntity, mappedBy: r => r.order })
  transactions = new Collection<TransactionEntity>(this);
}
