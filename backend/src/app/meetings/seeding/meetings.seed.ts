import { Meeting } from './../entities/meeting.entity';
import { Contract } from './../../contracts/entities/contract.entity';
import { Role } from '../../users/role.enum';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../users/entities/user.entity';
import { Client } from '../../clients/entities/client.entity';
import * as clc from 'cli-color';

const seeders = Number.parseInt(process.env.SEEDERS);

export default class CreateUsers implements Seeder {
  private showTitle = (title: string) => {
    console.log('');
    console.log(clc.bgYellow.blue('===================================='));
    console.log(clc.yellow(`   ${title}`));
    console.log(clc.bgYellow.blue('===================================='));
  };

  public async run(factory: Factory, connection: Connection): Promise<any> {
    const x3 = seeders;
    await factory(User)().create({
      email: 'admin@admin.es',
      username: 'admin',
      password: 'admin',
      role: Role.ADMIN,
    });
    this.showTitle(`User admin created!`);
    const user = await factory(User)().create({
      email: 'client@client.es',
      username: 'client',
      password: 'client',
      role: Role.CLIENT,
    });
    this.showTitle(`User client created!`);
    const clientTest = await factory(Client)().create({ user });
    this.showTitle(`Client to user client created!`);
    const contractTest = await factory(Contract)().create({
      client: clientTest,
    });
    this.showTitle(`Contract to user client created!`);
    for (let x = 0; x < x3; x++) {
      await factory(Meeting)().create({ contract: contractTest });
      console.log(
        clc.yellow(
          ' ===> Meeting to user client created! ' +
            clc.blue(x) +
            clc.yellow('/') +
            clc.blue(x3),
        ),
      );
    }
    await factory(User)().create({
      email: 'doctor@doctor.es',
      username: 'doctor',
      password: 'doctor',
      role: Role.DOCTOR,
    });

    let counter = 0;

    for (let i = 0; i < x3; i++) {
      if (i < x3 / 2) {
        const user = await factory(User)().create();
        const client = await factory(Client)().create({ user });
        const contract = await factory(Contract)().create({
          client,
          isActive: false,
        });
        for (let x = 0; x < 30; x++) {
          await factory(Meeting)().create({ contract });
          counter++;
        }
      } else {
        const user = await factory(User)().create();
        const client = await factory(Client)().create({ user });
        const contract = await factory(Contract)().create({
          client,
          isActive: true,
        });
        for (let x = 0; x < 30; x++) {
          await factory(Meeting)().create({
            contract,
            examsDone: Math.floor(Math.random() * 15),
          });
          counter++;
        }
      }
      console.log(
        clc.yellow(' ===> ') +
          clc.blue(counter) +
          clc.yellow('/') +
          clc.blue(x3 * 30),
      );
    }
  }
}
