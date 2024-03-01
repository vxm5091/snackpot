import { GroupEntity } from '@app/entities/main/group.entity';

import { EntityManager, Loaded } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupService {
  constructor(private readonly em: EntityManager) {}

  getGroupData(groupID: string) {
    return this.em.findOne(
      GroupEntity,
      { id: groupID },
      {
        populate: ['usersJoin.user', 'orders.transactions'],
      },
    );
  }

  async getGroupMemberBalance(
    groupEntity: Loaded<GroupEntity, 'usersJoin.user' | 'orders.transactions'>,
  ) {
    const userBalance = groupEntity.usersJoin.reduce(
      (acc, user) => {
        acc[user.user.id] = 0;
        return acc;
      },
      {} as Record<string, number>,
    );

    //   calculate balance for each user
    //   for each user in the group
    //   if the user paid for the order -- add all other users' amount to user's balance
    //   if the user did not pay for order -- subtract user amount for balance
    groupEntity.orders.getItems().forEach(order => {
      const payerUserID = order.payerUser.id;
      let payerUserBalance = 0;
      order.transactions.getItems().forEach(transaction => {
        if (transaction.user.id !== order.payerUser.id) {
          payerUserBalance += transaction.itemPrice;
          userBalance[payerUserID] -= transaction.itemPrice;
        }
      });

      userBalance[payerUserID] += payerUserBalance;
    });

    return userBalance;
  }
}
