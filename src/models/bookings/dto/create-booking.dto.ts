import {
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  IsNumber,
  IsDateString,
  IsOptional,
  ValidateNested,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ServiceInfo } from './service-info.dto';
import { AddOn } from './add-on.dto';

export class CreateBookingDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsPhoneNumber('AU')
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  street: string;

  @IsString()
  suburb: string;

  @IsNumber()
  zipcode: number;

  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsDateString()
  bookingDateTime: Date;

  @IsString()
  service: string;

  @IsString()
  serviceType: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ServiceInfo)
  serviceInfo: ServiceInfo;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddOn)
  addOns: AddOn[];

  @IsOptional()
  @IsString()
  otherInfo: string;

  @IsString()
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

  @IsOptional()
  @IsString()
  paymentStatus: string;

  @IsOptional()
  @IsString()
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
