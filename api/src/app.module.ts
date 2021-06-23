import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { SpotController } from './controllers/spot.controller';
import { SpotService } from './services/spot.service';
import { BookingService } from './services/booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserService } from './services/user.service';
import { BookingController } from './controllers/booking.controller';
import { Spot } from './entities/spot.entity';
import { Booking } from './entities/booking.entity';
import { Car } from './entities/car.entity';
import { User } from './entities/user.entity';
import { Rate } from './entities/rate.entity';
import { SessionToken } from './entities/sessionToken.entity'

const db = process.env.DATABASE_URL
  ? {url: process.env.DATABASE_URL}
  : { host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'parking2021'};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...db,
      type: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Spot, Booking, Car, User, Rate, SessionToken]),
  ],
  controllers: [BookingController, UserController, SpotController],
  providers: [SpotService, BookingService, UserService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
