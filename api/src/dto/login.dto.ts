export class LoginDto {
  email: string
  password: string
}

export type LoginResultDto
  = {result: 'Success', token: string}
  | {result: 'Failure'}
