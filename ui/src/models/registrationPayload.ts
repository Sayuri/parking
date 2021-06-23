import { User } from './user'

export interface RegistrationPayload {
  user: User
  password: string
}
