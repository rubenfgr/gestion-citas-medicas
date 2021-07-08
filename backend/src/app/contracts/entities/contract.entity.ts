import { Client } from './../../clients/entities/client.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;

  @Column({ type: 'timestamp' })
  dateStart: Date;

  @Column({ type: 'timestamp' })
  dateEnd: Date;

  @Column({ type: 'tinyint' })
  exams: number;

  @Column({ type: 'tinyint', default: 0 })
  examsDone: number;
}
