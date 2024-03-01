import { GroupService } from '@app/services/group/group.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
