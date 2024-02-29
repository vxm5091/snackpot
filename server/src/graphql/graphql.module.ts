import { GraphQLService } from '@app/graphql/graphql.service';
import { GroupGqlModule } from '@app/graphql/group/group.gql.module';
import { GroupMemberGqlModule } from '@app/graphql/groupMember/groupMember.gql.module';
import { OrderGqlModule } from '@app/graphql/order/order.gql.module';
import { TransactionGqlModule } from '@app/graphql/transaction/transaction.gql.module';
import { UserGqlModule } from '@app/graphql/user/user.gql.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLService,
    }),
    GroupGqlModule,
    GroupMemberGqlModule,
    OrderGqlModule,
    TransactionGqlModule,
    UserGqlModule,
  ],
})
export class GraphqlModule {}
