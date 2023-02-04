import { IsNumber, IsString } from 'class-validator';

export class AddOn {
  @IsString()
  text: string;

  @IsNumber()
  price: number;
}
