import { IsNumber } from 'class-validator';

export class ServiceInfo {
  @IsNumber()
  room: number;

  @IsNumber()
  bathroom: number;
}
