import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { GroupEdge } from '@app/graphql/group/group.model';
import {
  EGroupMemberField,
  GroupMember,
} from '@app/graphql/groupMember/groupMember.model';
import { TransactionConnection } from '@app/graphql/transaction/transaction.model';
import { ENodeType } from '@app/graphql/types';
import { UserEdge } from '@app/graphql/user/user.model';
import { RelayService } from '@app/relay/relay.service';
import { RelayConnection } from '@app/relay/types';
import { GroupService } from '@app/services/group/group.service';
import { EntityManager } from '@mikro-orm/knex';
import { Float, Parent, ResolveField, Resolver } from '@nestjs/graphql';

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
  ): Promise<RelayConnection<TransactionEntity>> {
    const txnEntities = await this.groupService.getUserGroupTransactions(
      groupMember.id,
    );

    return this.relayService.getConnection(txnEntities, ENodeType.Transaction);
  }

  @ResolveField(() => Float, { name: EGroupMemberField.Balance })
  async resolveBalance(@Parent() groupMember: GroupMember): Promise<number> {
    const txnEntities = await this.groupService.getUserGroupTransactions(
      groupMember.id,
    );

    return txnEntities.reduce((acc, transaction) => {
      if (!transaction.itemPrice) return acc;
      if (transaction.order.$.payer.id === groupMember.id) {
        return acc + transaction.itemPrice;
      } else {
        return acc - transaction.itemPrice;
      }
    }, 0);
  }
}
