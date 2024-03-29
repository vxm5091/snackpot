import { BaseEntity } from '@app/entities/abstract/base.entity';
import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { GroupEntity } from '@app/entities/main/group.entity';
import {
  Collection,
  Entity,
  Index,
  OneToMany,
  OptionalProps,
  PrimaryKey,
  Property,
  t,
} from '@mikro-orm/core';
import { toGlobalId } from 'graphql-relay/node/node';

@Entity({ tableName: 'users' })
export class UserEntity extends BaseEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt' | 'id' | 'globalID';
  @Property({
    persist: false,
  })
  get globalID() {
    return this.id ? toGlobalId('User', this.id) : '';
  }

  @Property({ type: t.text })
  username!: string;

  @Property({ type: t.text })
  firstName!: string;

  @Property({ type: t.text })
  lastName!: string;

  @Property({ type: t.text })
  avatarURL?: string;

  @Index()
  @OneToMany({
    entity: () => UserGroupJoinEntity,
    mappedBy: r => r.user,
  })
  groupsJoin = new Collection<UserGroupJoinEntity>(this);

  @Index()
  @OneToMany({
    entity: () => GroupEntity,
    mappedBy: r => r.owner,
  })
  groupsOwned = new Collection<GroupEntity>(this);
}
