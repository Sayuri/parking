import { NewCar } from './newCar.dto'

export class User {
  email: string
  phone: string
  firstName: string
  lastName: string
  apartment: number
  car: NewCar
}

export class NewUser {
  user: User
  password: string
}

