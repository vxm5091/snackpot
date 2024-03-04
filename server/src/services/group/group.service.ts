import { TransactionEntity } from '@app/entities/main/transaction.entity';

import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupService {
  constructor(private readonly em: EntityManager) {}

  async getUserGroupTransactions(
    groupMemberID: string,
  ): Promise<TransactionEntity[]> {
    return this.em.find(TransactionEntity, {
      $or: [{ payer: groupMemberID }, { recipient: groupMemberID }],
    });
  }

  async getGroupMemberBalanceAll(groupID: string) {
    const transactions = await this.em.find(TransactionEntity, {
      group: groupID,
    });

    return transactions.reduce((acc, txn) => {
      const payerID = txn.payer.id;
      const recipientID = txn.recipient.id;
      acc[payerID] = (acc[payerID] || 0) + txn.itemPrice;
      acc[recipientID] = (acc[recipientID] || 0) - txn.itemPrice;
      return acc;
    }, {});
  }
}
