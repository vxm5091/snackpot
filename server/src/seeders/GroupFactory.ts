import { GroupEntity } from '@app/entities/main/group.entity';
import { faker } from '@faker-js/faker';
import { Factory } from '@mikro-orm/seeder';

export class GroupFactory extends Factory<GroupEntity> {
  model = GroupEntity;

  definition(): Partial<GroupEntity> {
    return {
      id: faker.number.bigInt().toString(),
      groupName: `${faker.company.buzzAdjective()}${faker.company.buzzNoun()}`,
      avatarURL: faker.image.url(),
    };
  }
}
