import { USER_ID } from '@app/constants';
import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { GroupMemberConnection } from '@app/graphql/groupMember/groupMember.model';
import { ENodeType } from '@app/graphql/types';
import { EUserField, User } from '@app/graphql/user/user.model';
import { RelayService } from '@app/relay/relay.service';
import { GroupService } from '@app/services/group/group.service';
import { EntityManager } from '@mikro-orm/knex';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly em: EntityManager,
    private readonly relayService: RelayService,
    private readonly groupService: GroupService,
  ) {}

  //   ------------------------------------- Queries -------------------------------------
  @Query(() => User, { name: 'user' })
  getUser(@Args('id', { type: () => ID }) id: string): Promise<UserEntity> {
    return this.em.findOneOrFail(UserEntity, id);
  }

  @Query(() => User, { name: 'me' })
  getMe(): Promise<UserEntity> {
    return this.em.findOneOrFail(UserEntity, { id: USER_ID });
  }

  //   ------------------------------------- Mutations -------------------------------------
  //   ------------------------------------- Resolvers -------------------------------------
  @ResolveField(() => GroupMemberConnection, {
    name: EUserField.Groups,
  })
  async resolveGroups(@Parent() user: User): Promise<GroupMemberConnection> {
    const res = await this.em.find(UserGroupJoinEntity, { user: user.id });
    return this.relayService.getConnection(res, ENodeType.GroupMember);
  }
}
