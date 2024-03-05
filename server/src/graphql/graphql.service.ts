import { USER_ID } from '@app/constants';
import { UserEntity } from '@app/entities/main/user.entity';
import { IContextGQL, IReqRes } from '@app/graphql/types';
import { EntityManager } from '@mikro-orm/knex';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable, Logger } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql/error';
import { join } from 'path';

@Injectable()
export class GraphQLService implements GqlOptionsFactory {
  logger = new Logger(GraphQLService.name);

  constructor(private readonly em: EntityManager) {}

  async createGqlOptions(): Promise<Omit<ApolloDriverConfig, 'driver'>> {
    return {
      context: async ({ req, res }: IReqRes): Promise<IContextGQL> => {
        const userEntity = (await this.em
          .fork()
          .findOne(UserEntity, { id: USER_ID })) as UserEntity;

        return {
          req,
          res,
          userEntity,
        };
      },
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      persistedQueries: false,
      cache: 'bounded',
      sortSchema: true,
      inheritResolversFromInterfaces: true,
      formatError: (formattedError: GraphQLError, err: any) => {
        let graphQLFormattedError: GraphQLFormattedError;

        if (process.env.NODE_ENV === 'production') {
          graphQLFormattedError = {
            message: formattedError.message,
          };
        } else {
          graphQLFormattedError = err;
        }
        this.logger.error(err);
        return graphQLFormattedError;
      },
    };
  }
}
