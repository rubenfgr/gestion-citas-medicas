import { Meeting } from './../../meetings/entities/meeting.entity';
import {
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './../../users/entities/user.entity';

export class Client {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Meeting, (meeting) => meeting.client)
  meetings: Meeting[];

  @Column({ type: 'varchar', unique: true })
  cif: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  province: string;
}
