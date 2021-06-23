import { Get, Controller, Query, Post, Body } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { BookingDto } from '../dto/booking.dto';

@Controller()
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
  ) {}

  @Post()
  async create(@Body() booking: BookingDto) {
    return this.bookingService.bookSpot(booking);
  }

  @Get('/history')
  showHistory(@Query('start') start: Date, @Query('end') end: Date) {
    return this.bookingService.getBookings(start, end);
  }

  @Get('/history/rates')
  showRatesHistory(@Query('start') start: Date, @Query('end') end: Date) {
    return this.bookingService.getRatesHistory(start, end);
  }

  @Get('/rate')
  showCurrentRate() {
    return this.bookingService.getCurrentRate();
  }
}
