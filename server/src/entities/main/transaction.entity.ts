import { BaseEntity } from '@app/entities/abstract/base.entity';
import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { Entity, Index, ManyToOne, Property, Ref, t } from '@mikro-orm/core';
import { toGlobalId } from 'graphql-relay/node/node';

/*
 * User-level transaction data for a single item purchase.
 * */
@Entity({ tableName: 'transactions' })
export class TransactionEntity extends BaseEntity {
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
  @ManyToOne({ entity: () => UserEntity })
  payer!: Ref<UserEntity>;

  @Index()
  @ManyToOne({ entity: () => UserEntity })
  recipient!: Ref<UserEntity>;

  @Index()
  @ManyToOne({ entity: () => OrderEntity })
  order!: Ref<OrderEntity>;

  @Index()
  @ManyToOne({ entity: () => GroupEntity })
  group!: Ref<GroupEntity>;

  constructor({
    itemName,
    itemPrice,
  }: {
    itemName: string;
    itemPrice?: number;
  }) {
    super();
    this.itemName = itemName;
    this.itemPrice = itemPrice;
  }
}
