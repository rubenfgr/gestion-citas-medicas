import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Meeting } from '../entities/meeting.entity';

define(Meeting, (faker: typeof Faker) => {
  const meeting = new Meeting();
  meeting.date = faker.date.between(new Date(), new Date(2025, 12));
  meeting.date.setUTCHours(0, 0, 0, 0);
  meeting.examsRequired = Math.floor(Math.random() * 20);
  return meeting;
});
