import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { ConnectionCursor } from 'graphql-relay';

@ArgsType()
export class PaginationArgs {
  @Field(() => ID, {
    nullable: true,
    description: 'Paginate after cursor',
  })
  public after?: ConnectionCursor;

  @Field(() => Int, {
    nullable: true,
    description: 'Paginate first x items',
  })
  public first?: number;
}
