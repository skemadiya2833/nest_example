import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Roles } from './role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type:"enum", enum: Roles, default: Roles.WORKER })
  role: Roles;
}
