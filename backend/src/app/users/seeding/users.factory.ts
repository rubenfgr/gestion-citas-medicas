import * as Faker from 'faker';
import { define,  } from 'typeorm-seeding';
import { User } from '../entities/user.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.username =
    faker.internet.userName() + Math.floor(Math.random() * 999999);
  user.email = user.username + '@gmail.com';
  user.password = user.username;
  return user;
});
