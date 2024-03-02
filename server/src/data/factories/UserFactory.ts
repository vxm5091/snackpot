import { UserEntity } from '@app/entities/main/user.entity';
import { faker } from '@faker-js/faker';
import { Factory } from '@mikro-orm/seeder';

export class UserFactory extends Factory<UserEntity> {
  model = UserEntity;

  definition(): Partial<UserEntity> {
    return {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      avatarURL: faker.image.avatar(),
    };
  }
}
