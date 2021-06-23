export interface User {
  firstName: string
  lastName: string
  apartment: number
  phone: string
  email: string
  car: Car
}

export type UserWithBalanceAndId = User & {
  id: number
  balance: number
}

export type LoginDto = {
  email: string
  password: string
}

export type LoginResultDto
  = {result: 'Success', token: string}
  | {result: 'Failure'}

export interface Car {
  number: string
  brand: string
  model: string
}

export const emptyCar: Car = {
  number: '',
  brand: '',
  model: ''
}

export const emptyUser: User = {
  firstName: '',
  lastName: '',
  apartment: 0,
  phone: '',
  email: '',
  car: emptyCar
}

export type UserState
  = {type: 'Initial'}
  | {type: 'Loaded', value: UserWithBalanceAndId}
  | {type: 'NotFound'}
