import { BaseEntity } from '@app/entities/abstract/base.entity';
import { GroupEntity } from '@app/entities/main/group.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { ENodeType } from '@app/graphql/types';
import { Entity, Index, ManyToOne, Property, Ref, ref } from '@mikro-orm/core';
import { toGlobalId } from 'graphql-relay/node/node';

@Entity({
  tableName: 'users_groups',
})
export class UserGroupJoinEntity extends BaseEntity {
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
