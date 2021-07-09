import * as Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Client } from '../../clients/entities/client.entity';
import { Contract } from './../entities/contract.entity';

define(Contract, (faker: typeof Faker) => {
  const contract = new Contract();
  contract.dateStart = faker.date.recent(7);
  contract.dateEnd = faker.date.between(new Date(), new Date('2023-12-31'));
  contract.exams = Math.floor(Math.random() * 30) + 15;
  // contract.client = factory(Client)() as any;
  return contract;
});
