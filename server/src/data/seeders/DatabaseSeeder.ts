import { USER_ID } from '@app/constants';
import { MENU_ITEMS } from '@app/data/seeders/constants';
import { UserFactory } from '@app/data/seeders/UserFactory';
import { UserGroupJoinEntity } from '@app/entities/join/user-group.entity';
import { GroupEntity } from '@app/entities/main/group.entity';
import { OrderEntity } from '@app/entities/main/order.entity';
import { TransactionEntity } from '@app/entities/main/transaction.entity';
import { UserEntity } from '@app/entities/main/user.entity';
import { faker } from '@faker-js/faker';
import { EntityManager } from '@mikro-orm/knex';
import { Seeder } from '@mikro-orm/seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const me = em.create(UserEntity, {
      id: USER_ID,
      username: 'me',
      firstName: 'Me',
      lastName: 'Myself',
      avatarURL: faker.image.url(),
    });

    const group = em.create(GroupEntity, {
      id: faker.number.bigInt().toString(),
      groupName: 'My Group',
      avatarURL: faker.image.url(),
      owner: me,
    });

    const meMember = em.create(UserGroupJoinEntity, {
      id: faker.number.bigInt().toString(),
      user: me,
      group,
    });

    const order = em.create(OrderEntity, {
      id: faker.number.bigInt().toString(),
      group,
      payer: meMember,
    });
    new UserFactory(em)
      .each(user => {
        const friendMember = em.create(UserGroupJoinEntity, {
          id: faker.number.bigInt().toString(),
          user,
          group,
        });

        em.create(TransactionEntity, {
          id: faker.number.bigInt().toString(),
          recipient: friendMember,
          order,
          itemPrice: +faker.finance.amount({ min: 3, max: 10 }),
          itemName: MENU_ITEMS[Math.floor(Math.random() * MENU_ITEMS.length)],
        });
      })
      .make(4);
  }
}
