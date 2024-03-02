import { TransactionEntity } from '@app/entities/main/transaction.entity';

import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupService {
  constructor(private readonly em: EntityManager) {}

  async getGroupMemberBalance(groupID: string, userID: string) {
    const transactions = await this.em.find(TransactionEntity, {
      group: groupID,
      $or: [{ payer: userID }, { recipient: userID }],
    });

    return transactions.reduce((acc, transaction) => {
      if (transaction.payer.id === userID) {
        return acc + transaction.itemPrice;
      } else {
        return acc - transaction.itemPrice;
      }
    }, 0);
  }
}
