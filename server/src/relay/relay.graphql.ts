/* eslint-disable @typescript-eslint/ban-types */
import { RelayNode } from '@app/graphql/node/node.model';
import { RelayConnection, RelayEdge, RelayPageInfo } from '@app/relay/types';
import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as Relay from 'graphql-relay';

interface IRelayGeneric<T extends RelayNode> {
  Edge: Type<RelayEdge<T>>;
  Connection: Type<RelayConnection<T>>;
}

interface RelayFactoryConfig {
  includeBalance?: boolean;
}

@ObjectType(`PageInfo`, { isAbstract: true })
export class PageInfo implements RelayPageInfo {
  @Field({ nullable: true })
  startCursor!: Relay.ConnectionCursor;

  @Field({ nullable: true })
  endCursor!: Relay.ConnectionCursor;

  @Field(() => Boolean)
  hasPreviousPage!: boolean;

  @Field(() => Boolean)
  hasNextPage!: boolean;
}

export default function RelayGraphQLFactory<T extends RelayNode>(
  classRef: Type<T>,
  config?: RelayFactoryConfig,
): IRelayGeneric<T> {
  const name = classRef.name;

  @ObjectType(`${name}Edge`, { isAbstract: true })
  class Edge implements RelayEdge<T> {
    name = `${name}Edge`;

    @Field({ nullable: true })
    cursor!: Relay.ConnectionCursor;

    @Field(() => classRef, { nullable: true })
    node!: T;
  }

  @ObjectType(`${name}Connection`, { isAbstract: true })
  class Connection implements RelayConnection<T> {
    name = `${name}Connection`;

    @Field(() => [Edge], { nullable: true })
    edges!: RelayEdge<T>[];

    @Field(() => PageInfo, { nullable: true })
    pageInfo!: Relay.PageInfo;

    @Field(() => Int, { nullable: true })
    count!: number;
  }

  return { Edge, Connection };
}
