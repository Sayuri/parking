import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Booking } from './booking.entity'
import { Car } from './car.entity'
import { SessionToken } from './sessionToken.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  apartment: number

  @Column()
  phone: string

  @Column()
  email: string

  @Column({select: false})
  passwordHash: string

  @Column()
  balance: number

  @Column()
  status: 'active' | 'inactive'

  @OneToMany(type => Booking, booking => booking.user)
  bookings: Booking[]

  @OneToMany(type => Car, car => car.owner)
  cars: Car[]

  @OneToMany(type => SessionToken, token => token.user)
  sessionTokens: Array<SessionToken>
}
