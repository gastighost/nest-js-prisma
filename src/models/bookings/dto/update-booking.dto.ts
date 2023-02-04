import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { ServiceInfo } from './service-info.dto';
import { AddOn } from './add-on.dto';

export class UpdateBookingDto {
  @IsOptional()
  @IsDateString()
  bookingDateTime: Date;

  @IsOptional()
  @IsString()
  service: string;

  @IsOptional()
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

  @IsOptional()
  @IsString()
  bookingStatus: string;

  @IsOptional()
  @IsBoolean()
  hasGst: boolean;

  @IsOptional()
  @IsNumber()
  total: number;

  @IsOptional()
  @IsNumber()
  totalWithGst: number;

  @IsOptional()
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
