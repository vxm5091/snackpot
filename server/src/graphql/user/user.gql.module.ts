import { UserResolver } from '@app/graphql/user/user.resolver';
import { GroupService } from '@app/services/group/group.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserResolver, GroupService],
  exports: [UserResolver],
})
export class UserGqlModule {}
