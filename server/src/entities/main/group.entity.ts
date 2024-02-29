import { BaseEntity } from '@app/entities/abstract/base.entity';
import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
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
  @ManyToOne({
    entity: () => UserEntity,
  })
  owner!: UserEntity;
}
