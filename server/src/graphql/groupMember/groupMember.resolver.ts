import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { GroupEdge } from '@app/graphql/group/group.model';
import {
  EGroupMemberField,
  GroupMember,
} from '@app/graphql/groupMember/groupMember.model';
import { TransactionConnection } from '@app/graphql/transaction/transaction.model';
import { ENodeType } from '@app/graphql/types';
import { UserEdge } from '@app/graphql/user/user.model';
import { RelayService } from '@app/relay/relay.service';
import { GroupService } from '@app/services/group/group.service';
import { EntityManager } from '@mikro-orm/knex';
import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(() => GroupMember)
export class GroupMemberResolver {
  constructor(
    private readonly em: EntityManager,
    private readonly relayService: RelayService,
    private readonly groupService: GroupService,
  ) {}

  //   ------------------------------------- Queries -------------------------------------
  //   ------------------------------------- Mutations -------------------------------------
  //   ------------------------------------- Resolvers -------------------------------------

  @ResolveField(() => UserEdge, { name: EGroupMemberField.User })
  async resolveUser(@Parent() groupMember: GroupMember): Promise<UserEdge> {
    const memberEntity = await this.em.findOneOrFail(
      UserGroupJoinEntity,
      {
        id: groupMember.id,
      },
      { populate: ['user'] },
    );

    const userEntity = memberEntity.user.$;
    return this.relayService.getEdge(userEntity, ENodeType.User);
  }

  @ResolveField(() => GroupEdge, { name: EGroupMemberField.Group })
  async resolveGroup(@Parent() groupMember: GroupMember): Promise<GroupEdge> {
    const memberEntity = await this.em.findOneOrFail(
      UserGroupJoinEntity,
      {
        id: groupMember.id,
      },
      { populate: ['group'] },
    );

    const groupEntity = memberEntity.group.$;
    return this.relayService.getEdge(groupEntity, ENodeType.Group);
  }

  // TODO implement cache so we don't have to fetch the join entity from DB for each field and in this case avoid the 2nd round trip
  @ResolveField(() => TransactionConnection, {
    name: EGroupMemberField.Transactions,
  })
  async resolveTransactions(
    @Parent() groupMember: GroupMember,
  ): Promise<TransactionConnection> {
    const memberEntity = await this.em.findOneOrFail(UserGroupJoinEntity, {
      id: groupMember.id,
    });

    const transactionEntities =
      await this.groupService.getUserGroupTransactions(
        memberEntity.group.id,
        memberEntity.user.id,
      );

    return this.relayService.getConnection(
      transactionEntities,
      ENodeType.Transaction,
    );
  }

  @ResolveField(() => Int, { name: EGroupMemberField.Balance })
  async resolveBalance(@Parent() groupMember: GroupMember): Promise<number> {
    const memberEntity = await this.em.findOneOrFail(UserGroupJoinEntity, {
      id: groupMember.id,
    });
    return this.groupService.getGroupMemberBalanceOne(
      memberEntity.group.id,
      memberEntity.user.id,
    );
  }
}
