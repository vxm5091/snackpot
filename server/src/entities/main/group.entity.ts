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
  OptionalProps,
  Property,
  t,
} from '@mikro-orm/core';
import { toGlobalId } from 'graphql-relay/node/node';

@Entity({ tableName: 'groups' })
export class GroupEntity extends BaseEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt' | 'id' | 'globalID';

  @Property({
    persist: false,
  })
  get globalID() {
    return this.id ? toGlobalId('Group', this.id) : '';
  }

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
