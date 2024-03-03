import { TransactionEntity } from '@app/entities/main/transaction.entity';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '@app/graphql/transaction/transaction.dto';
import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  constructor(private readonly em: EntityManager) {}

  async createTransaction(
    input: CreateTransactionInput,
  ): Promise<TransactionEntity> {
    const transaction = new TransactionEntity({
      itemName: input.itemName,
      itemPrice: input.itemPrice,
    });

    await this.em.persistAndFlush(transaction);
    return transaction;
  }

  async updateTransaction(
    input: UpdateTransactionInput,
  ): Promise<TransactionEntity> {
    const transaction = await this.em.findOneOrFail(TransactionEntity, {
      id: input.id,
    });

    if (input.itemName) {
      transaction.itemName = input.itemName;
    }

    if (input.itemPrice) {
      transaction.itemPrice = input.itemPrice;
    }

    await this.em.flush();
    return transaction;
  }

  async updateTransactionsMany(
    transactions: UpdateTransactionInput[],
  ): Promise<TransactionEntity[]> {
    const transactionsID = [];
    const inputMap = new Map<string, UpdateTransactionInput>();
    for (const txn of transactions) {
      transactionsID.push(txn.id);
      inputMap.set(txn.id, txn);
    }

    const transactionEntities = await this.em.find(TransactionEntity, {
      id: { $in: transactionsID },
    });

    transactionEntities.forEach(txnEntity => {
      const txnInput = inputMap.get(txnEntity.id);
      txnEntity.itemName = txnInput.itemName;
      txnEntity.itemPrice = txnInput.itemPrice;
    });

    await this.em.flush();
    return transactionEntities;
  }
}
