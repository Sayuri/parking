import { Get, Controller, Post, Body, Query } from '@nestjs/common';
import { SpotService } from '../services/spot.service';
import { Spot } from '../entities/spot.entity';

@Controller()
export class SpotController {
  constructor(
    private readonly spotService: SpotService,
  ) {}

  @Get()
  showSpots(@Query('start') start: Date, @Query('end') end: Date) {
    return this.spotService.getSpots(start, end);
  }

  @Post()
  addSpot(@Body() spot: Spot) {
    return this.spotService.addSpot(spot);
  }
}
