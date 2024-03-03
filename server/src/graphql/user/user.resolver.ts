import { USER_ID } from '@app/constants';
import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import {
  GroupBalanceConnection,
  GroupBalanceEdge,
} from '@app/graphql/group/group.model';
import { OrderConnection } from '@app/graphql/order/order.model';
import { TransactionConnection } from '@app/graphql/transaction/transaction.model';
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
  @ResolveField(() => OrderConnection, {
    name: EUserField.OrdersPaid,
  })
  async resolveOrdersPaid(@Parent() user: User): Promise<OrderConnection> {
    const res = await this.em.find(OrderEntity, { payer: user.id });
    return this.relayService.getConnection(res, 'Order');
  }

  @ResolveField(() => TransactionConnection, {
    name: EUserField.Transactions,
  })
  async resolveTransactions(
    @Parent() user: User,
  ): Promise<TransactionConnection> {
    const res = await this.em.find(TransactionEntity, {
      $or: [{ payer: user.id }, { recipient: user.id }],
    });
    return this.relayService.getConnection(res, 'Transaction');
  }

  @ResolveField(() => GroupBalanceConnection, {
    name: EUserField.Groups,
  })
  async resolveGroups(@Parent() user: User): Promise<GroupBalanceConnection> {
    const groups = await this.em.find(GroupEntity, {
      usersJoin: { user: user.id },
    });
    const edges: GroupBalanceEdge[] = await Promise.all(
      groups.map(async group => {
        const balance = await this.groupService.getGroupMemberBalanceOne(
          group.id,
          user.id,
        );
        const regularEdge = this.relayService.getEdge(group, 'Group');
        return { ...regularEdge, balance };
      }),
    );

    return {
      edges,
      pageInfo: this.relayService.getPageInfo(edges),
    };
  }
}
