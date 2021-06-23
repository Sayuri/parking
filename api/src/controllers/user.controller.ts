import { Get, Post, Body, Controller, Param, Query, HttpCode, Req } from '@nestjs/common'
import { NewUser } from 'src/dto/newUser.dto'
import { UserService } from '../services/user.service'
import { LoginDto } from '../dto/login.dto'
import { Request } from 'express'

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Post('/')
  createUser(@Body() newUser: NewUser) {
    return this.userService.createUser(newUser)
  }

  @Post('/login')
  @HttpCode(200)
  logIn(@Body() newUser: LoginDto) {
    return this.userService.logIn(newUser)
  }

  @Get('/')
  showUsers() {
    return this.userService.getAllUsers()
  }

  @Get('/me')
  getMe(@Req() request: Request) {
    const token = request.header('Budarina-Token')
    return this.userService.getUserByToken(token)
  }

  @Get('/:id')
  getUser(@Param() params: { id: number }) {
    return this.userService.getUser(params.id)
  }

  @Get('/:id/balance')
  showBalance(@Param() params: { id: number }) {
    return this.userService.getBalance(params.id)
  }

  @Get('/:id/history')
  showUserHistory(@Param() params: { id: number }, @Query('start') start: Date, @Query('end') end: Date) {
    return this.userService.getUserHistory(params.id, start, end)
  }
}
