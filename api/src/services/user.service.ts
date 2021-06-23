import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, MoreThan, LessThan, Not } from 'typeorm'
import { User } from '../entities/user.entity'
import { Booking } from '../entities/booking.entity'
import { NewUser } from 'src/dto/newUser.dto'
import { Car } from 'src/entities/car.entity'
import * as bcrypt from 'bcrypt'
import { LoginDto, LoginResultDto } from '../dto/login.dto'
import { SessionToken } from '../entities/sessionToken.entity'
import { v4 as uuidv4 } from 'uuid'

type NewUserEntity = {
  firstName: string;
  lastName: string;
  apartment: number;
  phone: string;
  email: string;
  passwordHash: string;
  balance: number;
  status: 'active' | 'inactive';
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(SessionToken)
    private readonly sessionTokenRepository: Repository<SessionToken>,
  ) {
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find({relations: ['cars']})
  }

  getUser(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({where: {id}, relations: ['cars']})
  }

  async getUserByToken(token: string): Promise<User | undefined> {
    const dbToken = await this.sessionTokenRepository.findOne({where: {token}, relations: ['user']})
    if (!dbToken) return undefined
    return dbToken.user
  }

  async createUser(newUser: NewUser) {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(newUser.password, salt)

    const newUserEntity: NewUserEntity = {
      ...newUser.user,
      passwordHash: hash,
      balance: 100,
      status: 'active'
    }

    const createdUser = await this.userRepository.save(newUserEntity)
    this.carRepository.save({...newUser.user.car, owner: createdUser})
  }

  async logIn(payload: LoginDto): Promise<LoginResultDto> {
    const user = await this.userRepository.findOne({where: {email: payload.email}, select: ['id', 'email', 'passwordHash']})
    if (!user) return {result: 'Failure'}

    const passwordCheckResult = await bcrypt.compare(payload.password, user.passwordHash)
    if (!passwordCheckResult) return {result: 'Failure'}

    const token = uuidv4()
    await this.sessionTokenRepository.save({token, user})
    return {result: 'Success', token}
  }

  async getBalance(id: number) {
    const user = await this.userRepository.findOne(id)
    if (user) {
      return user.balance
    } else {
      return null
    }
  }

  async spendBalance(id: number, amount: number) {
    const user = await this.userRepository.findOneOrFail(id)
    user.balance -= amount
    return this.userRepository.save(user)
  }

  getUserHistory(id: number, start: Date, end: Date) {
    return this.bookingRepository.find(
      {where: {user: id, startDate: Not(MoreThan(end)), endDate: Not(LessThan(start))}, relations: ['user']},
    )
  }
}
