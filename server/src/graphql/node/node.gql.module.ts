import { NodeResolver } from '@app/graphql/node/node.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [NodeResolver],
  exports: [NodeResolver],
})
export class NodeGqlModule {}
