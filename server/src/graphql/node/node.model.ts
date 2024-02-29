/**
 * This forms the basis of caching in GraphQL Relay. Every type must implement the Node interface.
 * As long as every entity has a globally unique ID, it can be cached reliably.
 * */ import {
  Field,
  GraphQLISODateTime,
  ID,
  InterfaceType,
} from '@nestjs/graphql';

@InterfaceType('Node', { isAbstract: true })
export class RelayNode {
  @Field(() => ID, { description: 'The globally unique relay ID' })
  globalID: string;
}

@InterfaceType({ isAbstract: true, implements: () => RelayNode })
export class BaseNode extends RelayNode {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
