import { Client } from './../../clients/entities/client.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Client, (client) => client.meetings)
  client: Client;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'tinyint' })
  examsRequired: number;

  @Column({ type: 'tinyint' })
  examsDone: number;

  @Column({ type: 'boolean' })
  confirmed: boolean;
}
