import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '@app/graphql/transaction/transaction.dto';
import { ref } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  constructor(private readonly em: EntityManager) {}

  async createTransaction(
    input: CreateTransactionInput,
    userID: string,
  ): Promise<TransactionEntity> {
    const orderEntity = await this.em.findOneOrFail(OrderEntity, input.orderID)
    
    const transaction = this.em.create(TransactionEntity, {
      ...input,
      order: ref(OrderEntity, input.orderID),
      recipient: ref(OrderEntity, input.groupMemberID),
      
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
