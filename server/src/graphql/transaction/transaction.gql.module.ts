import { TransactionResolver } from '@app/graphql/transaction/transaction.resolver';
import {
  TransactionService
} from '@app/services/transaction/transaction.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [TransactionResolver, TransactionService],
  exports: [TransactionResolver],
})
export class TransactionGqlModule {}
