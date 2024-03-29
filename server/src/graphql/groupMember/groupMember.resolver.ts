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
import { fromGlobalId } from 'graphql-relay/node/node';

@Resolver(() => GroupMember)
export class GroupMemberResolver {
  constructor(
    private readonly em: EntityManager,
    private readonly relayService: RelayService,
    private readonly groupService: GroupService,
  ) {}

  //   ------------------------------------- Resolvers -------------------------------------
  @ResolveField(() => UserEdge, { name: EGroupMemberField.User })
  async resolveUser(@Parent() groupMember: GroupMember): Promise<UserEdge> {
    const groupMemberID = fromGlobalId(groupMember.globalID).id;
    const memberEntity = await this.em.findOneOrFail(
      UserGroupJoinEntity,
      {
        id: groupMemberID,
      },
      { populate: ['user'] },
    );

    const userEntity = memberEntity.user.$;
    return this.relayService.getEdge(userEntity, ENodeType.User);
  }

  @ResolveField(() => GroupEdge, { name: EGroupMemberField.Group })
  async resolveGroup(@Parent() groupMember: GroupMember): Promise<GroupEdge> {
    const groupMemberID = fromGlobalId(groupMember.globalID).id;
    const memberEntity = await this.em.findOneOrFail(
      UserGroupJoinEntity,
      {
        id: groupMemberID,
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
    const groupMemberID = fromGlobalId(groupMember.globalID).id;
    const txnEntities =
      await this.groupService.getUserGroupTransactions(groupMemberID);

    return this.relayService.getConnection(txnEntities, ENodeType.Transaction);
  }

  @ResolveField(() => Float, { name: EGroupMemberField.Balance })
  async resolveBalance(@Parent() groupMember: GroupMember): Promise<number> {
    const groupMemberID = fromGlobalId(groupMember.globalID).id;
    const txnEntities =
      await this.groupService.getUserGroupTransactions(groupMemberID);

    const balance = txnEntities.reduce((acc, transaction) => {
      if (!transaction.itemPrice) return acc;
      console.log({ transactionOrder: transaction.order.getEntity() });
      if (transaction.order.$.payer.id === groupMemberID) {
        return acc + transaction.itemPrice;
      } else {
        return acc - transaction.itemPrice;
      }
    }, 0);
    console.log({ balance });
    return balance;
  }
}
