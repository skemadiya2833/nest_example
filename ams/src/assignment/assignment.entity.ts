import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Status } from './status.enum';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "enum", enum: Status, default: Status.DUE })
  status: Status;

  @ManyToOne(() => User,  { eager: true })
  assignedUser: User;
}
