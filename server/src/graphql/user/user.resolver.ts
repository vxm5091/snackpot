import { USER_ID } from '@app/constants';
import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { Group } from '@app/graphql/group/group.model';
import { Order } from '@app/graphql/order/order.model';
import { Transaction } from '@app/graphql/transaction/transaction.model';
import { EUserField, User } from '@app/graphql/user/user.model';
import { EntityManager } from '@mikro-orm/knex';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay/node/node';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly em: EntityManager) {}

  //   ------------------------------------- Queries -------------------------------------
  @Query(() => User, { name: 'user' })
  getUser(@Args('id') id: string): Promise<UserEntity> {
    return this.em.findOneOrFail(UserEntity, id);
  }

  @Query(() => User, { name: 'me' })
  getMe(): Promise<UserEntity> {
    return this.em.findOneOrFail(UserEntity, { id: USER_ID });
  }

  //   ------------------------------------- Mutations -------------------------------------
  //   ------------------------------------- Resolvers -------------------------------------
  @ResolveField(() => ID, { name: EUserField.GlobalID })
  async resolveID(@Parent() user: User): Promise<string> {
    return toGlobalId('User', user.id);
  }

  @ResolveField(() => [Order], {
    name: EUserField.OrdersPaid,
    defaultValue: [],
  })
  async resolveOrdersPaid(@Parent() user: User): Promise<OrderEntity[]> {
    return this.em.find(OrderEntity, { payerUser: user.id });
  }

  @ResolveField(() => [Transaction], {
    name: EUserField.Transactions,
    defaultValue: [],
  })
  async resolveTransactions(
    @Parent() user: User,
  ): Promise<TransactionEntity[]> {
    return this.em.find(TransactionEntity, { user: user.id });
  }

  @ResolveField(() => [Group], {
    name: EUserField.Groups,
    defaultValue: [],
  })
  async resolveGroups(@Parent() user: User): Promise<GroupEntity[]> {
    return this.em.find(GroupEntity, { usersJoin: { user: user.id } });
  }
}
