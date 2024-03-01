import { GroupResolver } from '@app/graphql/group/group.resolver';
import { GroupService } from '@app/services/group/group.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [GroupResolver, GroupService],
  exports: [GroupResolver],
})
export class GroupGqlModule {}
