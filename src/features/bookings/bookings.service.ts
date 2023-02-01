import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async createBooking(bookingData: Prisma.BookingCreateInput): Promise<any> {
    const booking = await this.prisma.booking.create({
      data: bookingData,
    });

    return booking;
  }

  async getBookings(date?: string) {
    const where: { bookingDateTime?: { gte: Date; lte: Date } } = {};

    if (date) {
      const newDate = new Date(date);

      if (isNaN(newDate.getTime())) {
        throw new HttpException(
          { error: 'Date format is not valid' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const startOfDay = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate(),
      );
      const endOfDay = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate(),
        23,
        59,
        59,
        999,
      );
      where.bookingDateTime = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    return await this.prisma.booking.findMany({
      where,
    });
  }

  async updateBooking(
    id: string,
    bookingUpdateData: Prisma.BookingUpdateInput,
  ) {
    const updatedBooking = await this.prisma.booking.update({
      where: {
        id,
      },
      data: bookingUpdateData,
    });

    return updatedBooking;
  }
}
