import { GroupModule } from '@app/services/group/group.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [GroupModule],
})
export class ServicesModule {}
