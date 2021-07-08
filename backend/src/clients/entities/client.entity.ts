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
  razonSocial: string;

  @Column({ type: 'varchar' })
  direccion: string;

  @Column({ type: 'varchar' })
  municipio: string;

  @Column({ type: 'varchar' })
  provincia: string;
}
