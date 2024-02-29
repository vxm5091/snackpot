import { TransactionResolver } from '@app/graphql/transaction/transaction.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [TransactionResolver],
  exports: [TransactionResolver],
})
export class TransactionGqlModule {}
