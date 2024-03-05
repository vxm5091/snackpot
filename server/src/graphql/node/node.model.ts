import { gqlEntityMap } from '@app/graphql/node/gqlEntityMap';
import { Field, GraphQLISODateTime, ID, InterfaceType } from '@nestjs/graphql';
import { fromGlobalId } from 'graphql-relay/node/node';

/**
 * This forms the basis of caching in GraphQL Relay. Every type must implement the Node interface.
 * As long as every entity has a globally unique ID, it can be cached reliably.
 * On the server side, we're naming it "globalID" to create a clear distinction vs. an entity's "id" field
 * On the client side, we're naming it "id" because we won't expose the DB's "id" field to the client
 * */

@InterfaceType('Node', {
  resolveType: data => {
    return fromGlobalId(data.globalID).type as keyof typeof gqlEntityMap;
  },
})
export class RelayNode {
  @Field(() => ID, { description: 'globally unique ID', name: 'id' })
  globalID: string;
}

@InterfaceType({ isAbstract: true, implements: () => RelayNode })
export class BaseNode extends RelayNode {
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
