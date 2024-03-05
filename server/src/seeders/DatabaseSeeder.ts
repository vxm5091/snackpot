import { USER_ID } from '@app/constants';
import { MENU_ITEMS } from '@app/seeders/constants';
import { GroupFactory } from '@app/seeders/GroupFactory';
import { UserFactory } from '@app/seeders/UserFactory';
import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { faker } from '@faker-js/faker';
import { ref, wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/knex';
import { Seeder } from '@mikro-orm/seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const PAST_ORDERS = process.env.PAST_ORDERS_PER_GROUP ? +process.env.PAST_ORDERS_PER_GROUP  : 10;
    const GROUPS = process.env.GROUPS ? +process.env.GROUPS : 3;
    
    const me = em.create(UserEntity, {
      id: USER_ID,
      username: 'me',
      firstName: 'Me',
      lastName: 'Myself',
      avatarURL: faker.image.url(),
    });

    new GroupFactory(em)
      .each(group => {
        wrap(group).assign({ owner: me });

        const otherUsers = new UserFactory(em).make(
          faker.number.int({ min: 3, max: 10 }),
        );

        const groupMembersUserID = [me.id, ...otherUsers.map(user => user.id)];

        const memberEntities = groupMembersUserID.map(userID =>
          em.create(UserGroupJoinEntity, {
            id: faker.number.bigInt().toString(),
            user: ref(UserEntity, userID),
            group,
          }),
        );

        
        for (let i = 0; i < PAST_ORDERS; i++) {
          const payer = faker.helpers.arrayElement(memberEntities);

          const order = em.create(OrderEntity, {
            id: faker.number.bigInt().toString(),
            group,
            payer,
            createdAt: i === 0 ? Date() : faker.date.recent({ days: i }),
            updatedAt: i === 0 ? Date() : faker.date.recent({ days: i }),
            isActive: i === 0,
          });

          const transactions = memberEntities.map(member => {
            if (member.id === payer.id) return;
            return em.create(TransactionEntity, {
              id: faker.number.bigInt().toString(),
              recipient: member,
              order,
              itemPrice: +faker.finance.amount({ min: 3, max: 10 }),
              itemName:
                MENU_ITEMS[Math.floor(Math.random() * MENU_ITEMS.length)],
            });
          });
        }
      })
      .make(GROUPS, { owner: me });
  }
}
