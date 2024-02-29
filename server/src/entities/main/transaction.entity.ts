import { BaseEntity } from '@app/entities/abstract/base.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { Entity, ManyToOne, Property, Ref, t } from '@mikro-orm/core';

/*
 * User-level transaction data for a single item purchase.
 * */
@Entity({ tableName: 'transactions' })
export class TransactionEntity extends BaseEntity {
  @Property({ type: t.text })
  itemName!: string;

  @Property({ type: t.float, nullable: true })
  itemPrice?: number;

  @ManyToOne({ entity: () => UserEntity })
  user!: Ref<UserEntity>;

  @ManyToOne({ entity: () => OrderEntity })
  order!: Ref<OrderEntity>;
}
