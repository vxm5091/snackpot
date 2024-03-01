import { GroupEntity } from '@app/entities/main/group.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { Entity, Index, ManyToOne, Ref, ref } from '@mikro-orm/core';

@Entity({
  tableName: 'users_groups',
})
export class UserGroupJoinEntity {
  @Index()
  @ManyToOne({
    primary: true,
    entity: () => UserEntity,
  })
  user!: Ref<UserEntity>;

  @Index()
  @ManyToOne({
    primary: true,
    entity: () => GroupEntity,
  })
  group!: Ref<GroupEntity>;

  constructor(userID: string, groupID: string) {
    this.user = ref(UserEntity, userID);
    this.group = ref(GroupEntity, groupID);
  }
}
