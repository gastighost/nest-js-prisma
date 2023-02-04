import {
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsMobilePhone()
  phone: string;

  @MinLength(8)
  password: string;
}
