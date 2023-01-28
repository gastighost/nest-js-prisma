import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsBoolean,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsPhoneNumber('AU')
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  suburb: string;

  @IsNumber()
  zipcode: number;

  @IsNotEmpty()
  state: string;

  country: string;

  @IsDateString()
  bookingDateTime: Date;

  @IsNotEmpty()
  service: string;

  @IsNotEmpty()
  serviceType: string;

  serviceInfo: string;

  addOns: string;

  otherInfo: string;

  @IsNotEmpty()
  bookingStatus: string;

  @IsBoolean()
  hasGst: boolean;

  @IsNumber()
  total: number;

  totalWithGst: number;

  @IsNumber()
  numberOfHours: number;

  paymentStatus: string;

  notes: string;

  isPaid: boolean;

  isConfirmed: boolean;

  numberOfPartners: number;
}
