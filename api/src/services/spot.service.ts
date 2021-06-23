import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spot } from '../entities/spot.entity';
import { SpotDto } from '../dto/spot.dto';

const determineStatus = (spot: Spot, start: Date | null, end: Date | null): 'out' | 'free' | 'booked'  => {
  if (spot.closedForMaintenance) return 'out';
  if (!spot.bookings.length) return 'free';
  if (!!start && !!end) {
    return !!spot.bookings
      .find(booking => new Date(booking.startDate) <= new Date(end) && new Date(start) <= new Date(booking.endDate))
      ? 'booked' : 'free';
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  spot.bookings.forEach(booking => console.log(new Date(booking.startDate)));
  return !!spot.bookings
    .find(booking => new Date(booking.startDate) <= today && today <= new Date(booking.endDate))
    ? 'booked' : 'free';
};

@Injectable()
export class SpotService {
  constructor(
    @InjectRepository(Spot)
    private readonly spotRepository: Repository<Spot>,
  ) {}

  async getSpots(start: Date, end: Date): Promise<SpotDto[]> {
    const spots = await this.spotRepository.find({
      relations: ['bookings'],
      order: {number: 'ASC'},
    });
    return spots.map(spot => ({
      number: spot.number,
      status: start && end
        ? determineStatus(spot, start, end)
        : determineStatus(spot, null, null),
    }));
  }

  async addSpot(spot: Spot) {
    return this.spotRepository.save(spot);
  }

  async getSpotById(id: number) {
    return this.spotRepository.findOne({ where: {id} });
  }
}
