import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Contract } from './../../contracts/entities/contract.entity';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Contract, (contract) => contract.meetings)
  @JoinColumn()
  contract: Contract;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'tinyint' })
  examsRequired: number;

  @Column({ type: 'tinyint', default: 0 })
  examsDone: number;

  @Column({ type: 'boolean', default: false })
  confirmed: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
