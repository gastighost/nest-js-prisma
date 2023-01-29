import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

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

  @Get()
  async getBookings() {
    const bookings = await this.bookingsService.getBookings();

    return { message: 'Bookings successfully retrieved!', bookings };
  }
}
