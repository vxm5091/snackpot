import { IContextGQL, IReqRes } from '@app/core/types/http.types';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable, Logger } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql/error';
import { join } from 'path';

@Injectable()
export class GraphQLService implements GqlOptionsFactory {
  logger = new Logger(GraphQLService.name);

  async createGqlOptions(): Promise<Omit<ApolloDriverConfig, 'driver'>> {
    return {
      context: async ({ req, res }: IReqRes): Promise<IContextGQL> => {
        return {
          req,
          res,
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
