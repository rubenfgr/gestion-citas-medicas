import * as Faker from 'faker';
import { define, factory,  } from 'typeorm-seeding';
import { Contract } from '../../contracts/entities/contract.entity';
import { Meeting } from '../entities/meeting.entity';

define(Meeting, (faker: typeof Faker) => {
  const meeting = new Meeting();
  meeting.date = faker.date.between(new Date(), new Date('2025-01-01'));
  meeting.examsRequired = Math.floor(Math.random() * 20);
  meeting.examsDone = 0;
  // meeting.contract = factory(Contract)() as any;
  return meeting;
});
