import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class Spot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  closedForMaintenance: boolean;

  @OneToMany(type => Booking, booking => booking.spot)
  bookings: Booking[];
}
