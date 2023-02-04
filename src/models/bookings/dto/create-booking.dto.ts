import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsBoolean,
  IsNumber,
  IsDateString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ServiceInfo } from './service-info.dto';
import { AddOn } from './add-on.dto';

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

  @IsOptional()
  @ValidateNested()
  @Type(() => ServiceInfo)
  serviceInfo: ServiceInfo;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddOn)
  addOns: AddOn[];

  otherInfo: string;

  @IsNotEmpty()
  bookingStatus: string;

  @IsBoolean()
  hasGst: boolean;

  @IsNumber()
  total: number;

  @IsOptional()
  @IsNumber()
  totalWithGst: number;

  @IsNumber()
  numberOfHours: number;

  paymentStatus: string;

  notes: string;

  @IsOptional()
  @IsBoolean()
  isPaid: boolean;

  @IsOptional()
  @IsBoolean()
  isConfirmed: boolean;

  @IsOptional()
  @IsNumber()
  numberOfPartners: number;
}
