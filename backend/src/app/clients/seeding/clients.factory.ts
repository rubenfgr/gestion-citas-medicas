/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Client } from '../entities/client.entity';

const getRandomCIF = () => {
  const firstLetter = 'ABCDEFGHJKLMNPQRSUVW'[Math.floor(Math.random() * 20)];
  const numbers = [0, 0, 0, 0, 0, 0, 0].map((v) =>
    Math.floor(Math.random() * 10),
  );
  const lastLetterNumber = '0123456789ABCDFGJ'[Math.floor(Math.random() * 17)];
  return `${firstLetter}${numbers.join('')}${lastLetterNumber}`;
};

define(Client, (faker: typeof Faker) => {
  const client = new Client();
  client.cif = getRandomCIF();
  client.address = faker.address.streetAddress(true);
  client.city = faker.address.city();
  client.province = faker.address.state();
  client.name = faker.company.companyName() + Math.random() * 99999;
  return client;
});
