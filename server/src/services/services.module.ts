import { GroupModule } from '@app/services/group/group.module';
import {
  TransactionModule
} from '@app/services/transaction/transaction.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [GroupModule, TransactionModule],
})
export class ServicesModule {}
