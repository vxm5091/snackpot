import { GroupResolver } from '@app/graphql/group/group.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [GroupResolver],
  exports: [GroupResolver],
})
export class GroupGqlModule {}