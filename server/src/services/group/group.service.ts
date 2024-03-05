import { TransactionEntity } from '@app/entities/main/transaction.entity';

import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupService {
  constructor(private readonly em: EntityManager) {}
  
  
  async getUserGroupTransactions(groupMemberID: string) {
    return this.em.find(
      TransactionEntity,
      {
        $or: [
          { recipient: groupMemberID },
          { order: { payer: groupMemberID } },
        ],
      },
      { populate: ['order'], orderBy: { createdAt: 'DESC' } },
    );
  }

  async getGroupMemberBalanceAll(
    groupID: string,
  ): Promise<Record<string, number>> {
    const transactions = await this.em.find(
      TransactionEntity,
      {
        order: { group: groupID },
      },
      { populate: ['order'] },
    );

    const balances = transactions.reduce((acc, txn) => {
      if (!txn.itemPrice) {
        return acc;
      }
      const payerID = txn.order.$.payer.id;
      const recipientID = txn.recipient.id;
      acc[payerID] = (acc[payerID] || 0) + txn.itemPrice;
      acc[recipientID] = (acc[recipientID] || 0) - txn.itemPrice;
      return acc;
    }, {});

    return balances;
  }
}
