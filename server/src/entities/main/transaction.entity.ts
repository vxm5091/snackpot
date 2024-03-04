import { BaseEntity } from '@app/entities/abstract/base.entity';
import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import {
  Entity,
  Index,
  ManyToOne,
  OptionalProps,
  Property,
  Ref,
  t,
} from '@mikro-orm/core';
import { toGlobalId } from 'graphql-relay/node/node';

/*
 * User-level transaction data for a single item purchase.
 * */
@Entity({ tableName: 'transactions' })
export class TransactionEntity extends BaseEntity {
  [OptionalProps]?:
    | 'createdAt'
    | 'updatedAt'
    | 'id'
    | 'globalID'
  @Property({
    persist: false,
  })
  get globalID() {
    return this.id ? toGlobalId('Transaction', this.id) : '';
  }

  @Property({ type: t.text })
  itemName!: string;

  @Property({ type: t.float, nullable: true })
  itemPrice?: number;

  @Index()
  @ManyToOne({ entity: () => UserGroupJoinEntity })
  payer!: Ref<UserGroupJoinEntity>;

  @Index()
  @ManyToOne({ entity: () => UserGroupJoinEntity })
  recipient!: Ref<UserGroupJoinEntity>;

  @Index()
  @ManyToOne({ entity: () => OrderEntity })
  order!: Ref<OrderEntity>;

  // @Index()
  // @ManyToOne({ entity: () => GroupEntity })
  // group!: Ref<GroupEntity>;
}
