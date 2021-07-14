import { PrimaryGeneratedColumn, Column, BeforeInsert, Entity } from 'typeorm';
import { Role } from '../role.enum';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.NONE })
  role: Role;

  @BeforeInsert()
  passwordEncrypt() {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
