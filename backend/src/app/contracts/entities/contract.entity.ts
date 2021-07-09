import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Meeting } from '../../meetings/entities/meeting.entity';
import { Client } from './../../clients/entities/client.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Client)
  @JoinColumn()
  client: Client;

  @OneToMany(() => Meeting, (meeting) => meeting.contract)
  meetings: Meeting[];

  @Column({ type: 'timestamp' })
  dateStart: Date;

  @Column({ type: 'timestamp' })
  dateEnd: Date;

  @Column({ type: 'tinyint' })
  exams: number;

  @Column({ type: 'tinyint', default: 0 })
  examsDone: number;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;
}
