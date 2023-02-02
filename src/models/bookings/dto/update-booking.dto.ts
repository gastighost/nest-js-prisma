import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsDateString()
  bookingDateTime: Date;

  service: string;

  serviceType: string;

  serviceInfo: string;

  addOns: string;

  otherInfo: string;

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
