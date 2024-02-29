import { GroupEntity } from '@app/entities/main/group.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { Entity, Index, ManyToOne } from '@mikro-orm/core';

@Entity({
  tableName: 'users_groups',
})
export class UserGroupJoinEntity {
  @Index()
  @ManyToOne({
    primary: true,
    entity: () => UserEntity,
  })
  user!: UserEntity;

  @Index()
  @ManyToOne({
    primary: true,
    entity: () => GroupEntity,
  })
  group!: GroupEntity;
}
