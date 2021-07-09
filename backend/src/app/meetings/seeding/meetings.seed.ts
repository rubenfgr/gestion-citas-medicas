import { Meeting } from './../entities/meeting.entity';
import { Contract } from './../../contracts/entities/contract.entity';
import { Role } from '../../users/role.enum';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../users/entities/user.entity';
import { Client } from '../../clients/entities/client.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().create({
      email: 'admin@admin.es',
      username: 'admin',
      password: 'admin',
      role: Role.ADMIN,
    });
    await factory(User)().create({
      email: 'client@client.es',
      username: 'client',
      password: 'client',
      role: Role.CLIENT,
    });
    await factory(User)().create({
      email: 'doctor@doctor.es',
      username: 'doctor',
      password: 'doctor',
      role: Role.DOCTOR,
    });
    for (let i = 0; i < 10; i++) {
      const user = await factory(User)().create();
      const client = await factory(Client)().create({ user });
      const contract = await factory(Contract)().create({ client });
      for (let x = 0; x < 3; x++) {
        await factory(Meeting)().create({ contract });
      }
    }
  }
}
