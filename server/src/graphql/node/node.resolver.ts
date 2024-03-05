import { BaseEntity } from '@app/entities/abstract/base.entity';
import { gqlEntityMap } from '@app/graphql/node/gqlEntityMap';
import { RelayNode } from '@app/graphql/node/node.model';
import { EntityManager } from '@mikro-orm/knex';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { fromGlobalId } from 'graphql-relay/node/node';

@Resolver(() => RelayNode)
export class NodeResolver {
  constructor(private readonly em: EntityManager) {}

  @Query(() => RelayNode, { nullable: true })
  async node(
    @Args({ name: 'id', type: () => ID }) globalID: string,
  ): Promise<BaseEntity | null> {
    const { id, type } = fromGlobalId(globalID);
    const entityType = gqlEntityMap?.[type];
    if (!entityType) {
      return null;
    }
    return this.em.findOne(entityType, id);
  }
}
