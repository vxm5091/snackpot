import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { GroupEntity } from '@app/entities/main/group.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';

import { EntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupService {
  constructor(private readonly em: EntityManager) {}

  getEntity(groupID: string) {
    return this.em.findOne(GroupEntity, groupID);
  }
  
  async getGroupMembers(groupID: string): Promise<UserEntity[]> {
    const res = await this.em.find(
      UserGroupJoinEntity,
      { group: groupID },
      { populate: ['user'] },
    );

    return res.map(join => join.user.getEntity());
  }

  async getGroupMemberBalanceOne(groupID: string, userID: string) {
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
