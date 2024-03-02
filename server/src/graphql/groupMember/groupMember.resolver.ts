import {
  EGroupMemberField,
  GroupMember,
} from '@app/graphql/groupMember/groupMember.model';
import { GroupService } from '@app/services/group/group.service';
import { EntityManager } from '@mikro-orm/knex';
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(() => GroupMember)
export class GroupMemberResolver {
  constructor(
    private readonly em: EntityManager,
    private readonly groupService: GroupService,
  ) {}

  //   ------------------------------------- Queries -------------------------------------
  //   ------------------------------------- Mutations -------------------------------------
  //   ------------------------------------- Resolvers -------------------------------------
  @ResolveField(() => Int, { name: EGroupMemberField.Balance })
  resolveBalance(@Parent() groupMember: GroupMember): Promise<number> {
    // return this.groupService.getGroupMemberBalance(groupMember.)
  }
}
