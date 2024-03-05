import { RelayPageInfo } from '@app/relay/types';
import { Field, ObjectType } from '@nestjs/graphql';
import * as Relay from 'graphql-relay';

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
