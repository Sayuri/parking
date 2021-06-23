import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class SessionToken {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  token: string

  @ManyToOne(type => User, user => user.sessionTokens)
  user: User
}
