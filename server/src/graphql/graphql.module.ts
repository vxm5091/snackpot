import { GraphQLService } from '@app/graphql/graphql.service';
import { GroupGqlModule } from '@app/graphql/group/group.gql.module';
import { GroupMemberGqlModule } from '@app/graphql/groupMember/groupMember.gql.module';
import { NodeGqlModule } from '@app/graphql/node/node.gql.module';
import { OrderGqlModule } from '@app/graphql/order/order.gql.module';
import { TransactionGqlModule } from '@app/graphql/transaction/transaction.gql.module';
import { UserGqlModule } from '@app/graphql/user/user.gql.module';
import { RelayModule } from '@app/relay/relay.module';
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
    OrderGqlModule,
    TransactionGqlModule,
    UserGqlModule,
    GroupMemberGqlModule,
    NodeGqlModule,
    RelayModule,
  ],
})
export class GraphqlModule {}
