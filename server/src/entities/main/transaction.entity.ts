import { BaseEntity } from '@app/entities/abstract/base.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { Entity, Index, ManyToOne, Property, Ref, t } from '@mikro-orm/core';

/*
 * User-level transaction data for a single item purchase.
 * */
@Entity({ tableName: 'transactions' })
export class TransactionEntity extends BaseEntity {
  @Property({ type: t.text })
  itemName!: string;

  @Property({ type: t.float, nullable: true })
  itemPrice?: number;

  @Index()
  @ManyToOne({ entity: () => UserEntity })
  user!: Ref<UserEntity>;

  @Index()
  @ManyToOne({ entity: () => OrderEntity })
  order!: Ref<OrderEntity>;

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
