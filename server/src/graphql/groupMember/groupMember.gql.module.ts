import {
  GroupMemberResolver
} from '@app/graphql/groupMember/groupMember.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [GroupMemberResolver],
  exports: [GroupMemberResolver],
})
export class GroupMemberGqlModule {}