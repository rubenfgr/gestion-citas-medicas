import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Contract } from './../entities/contract.entity';

define(Contract, (faker: typeof Faker) => {
  const contract = new Contract();
  contract.dateStart = faker.date.recent(7);
  contract.dateStart.setUTCHours(0, 0, 0, 0);
  contract.dateEnd = faker.date.between(new Date(), new Date('2023-12-31'));
  contract.dateEnd.setUTCHours(0, 0, 0, 0);
  contract.exams = Math.floor(Math.random() * 30) + 15;
  return contract;
});
