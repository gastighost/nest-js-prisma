import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async createBooking(bookingData: Prisma.BookingCreateInput): Promise<any> {
    const booking = await this.prisma.booking.create({
      data: bookingData,
    });

    return booking;
  }

  async getBookings() {
    return await this.prisma.booking.findMany();
  }
}
