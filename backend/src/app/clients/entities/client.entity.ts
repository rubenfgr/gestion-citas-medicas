import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Contract } from './../../contracts/entities/contract.entity';
import { User } from './../../users/entities/user.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Contract, (contract) => contract.client)
  contracts: Contract[];

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
