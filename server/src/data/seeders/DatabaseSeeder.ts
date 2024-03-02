import { UserFactory } from '@app/data/factories/UserFactory';
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
      id: '1',
      username: 'me',
      firstName: 'Me',
      lastName: 'Myself',
    });

    const group = em.create(GroupEntity, {
      id: faker.string.uuid(),
      groupName: 'My Group',
      avatarURL: faker.image.avatar(),
      owner: me,
    });

    const friends = new UserFactory(em)
      .each(user => {
        //   add to my group (join)
        em.create(UserGroupJoinEntity, {
          user,
          group,
        });
      })
      .make(4);

    const order = em.create(OrderEntity, {
      id: faker.string.uuid(),
      group,
      payer: me,
    });

    const ITEMS = ['coffee', 'tea', 'soda', 'juice'];

    for (const friend of friends) {
      em.create(TransactionEntity, {
        id: faker.string.uuid(),
        recipient: friend,
        payer: me,
        order,
        group,
        itemPrice: +faker.finance.amount({ min: 3, max: 10 }),
        itemName: ITEMS[Math.floor(Math.random() * ITEMS.length)],
      });
    }
  }
}
