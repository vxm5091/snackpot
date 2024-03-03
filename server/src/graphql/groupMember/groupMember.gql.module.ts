import {
  GroupMemberResolver
} from '@app/graphql/groupMember/groupMember.resolver';
import { GroupService } from '@app/services/group/group.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [GroupMemberResolver, GroupService],
  exports: [GroupMemberResolver]
})
export class GroupMemberGqlModule {}