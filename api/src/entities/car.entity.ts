import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @ManyToOne(type => User, user => user.bookings)
    owner: User;
}
