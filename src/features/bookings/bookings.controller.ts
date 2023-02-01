import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/services/auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBooking(@Body() body: CreateBookingDto) {
    const {
      firstName,
      lastName,
      phone,
      email,
      street,
      suburb,
      zipcode,
      state,
      country,
      bookingDateTime,
      service,
      serviceType,
      serviceInfo,
      addOns,
      otherInfo,
      bookingStatus,
      hasGst,
      total,
      totalWithGst,
      numberOfHours,
      paymentStatus,
      notes,
      isPaid,
      isConfirmed,
      numberOfPartners,
    } = body;

    const booking = await this.bookingsService.createBooking({
      bookingDateTime,
      service,
      serviceType,
      serviceInfo,
      addOns,
      otherInfo,
      bookingStatus,
      hasGst,
      total,
      totalWithGst,
      numberOfHours,
      paymentStatus,
      notes,
      isPaid,
      isConfirmed,
      numberOfPartners,
      bookingClient: { create: { firstName, lastName, phone, email } },
      bookingAddress: { create: { street, suburb, zipcode, state, country } },
    });

    return { message: 'Booking successfully created!', booking };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getBookings(@Query('date') date: string) {
    const bookings = await this.bookingsService.getBookings(date);

    return { message: 'Bookings successfully retrieved!', bookings };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateBooking(@Param('id') id: string, @Body() body: UpdateBookingDto) {
    const {
      bookingDateTime,
      service,
      serviceType,
      serviceInfo,
      addOns,
      otherInfo,
      bookingStatus,
      hasGst,
      total,
      totalWithGst,
      numberOfHours,
      paymentStatus,
      notes,
      isPaid,
      isConfirmed,
      numberOfPartners,
    } = body;

    const updatedBooking = await this.bookingsService.updateBooking({
      where: { id },
      data: {
        bookingDateTime,
        service,
        serviceType,
        serviceInfo,
        addOns,
        otherInfo,
        bookingStatus,
        hasGst,
        total,
        totalWithGst,
        numberOfHours,
        paymentStatus,
        notes,
        isPaid,
        isConfirmed,
        numberOfPartners,
      },
    });

    return { message: 'Booking successfully updated!', updatedBooking };
  }
}
