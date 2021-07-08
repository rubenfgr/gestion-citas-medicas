import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './../../users/entities/user.entity';

export class Client {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

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
