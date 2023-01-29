import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signup(@Body() body: CreateUserDto) {
    const { firstName, lastName, email, phone, password } = body;

    const existingUser = await this.usersService.getUser({ email });

    if (existingUser) {
      throw new HttpException(
        { error: 'This email has already been taken' },
        400,
      );
    }

    const user = await this.usersService.createUser({
      firstName,
      lastName,
      email,
      phone,
      password,
    });

    return { message: 'User successfully signed up!', user };
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginUserDto) {
    const { email, password } = body;

    const token = await this.usersService.loginUser({ email, password });

    if (!token) {
      throw new HttpException({ error: 'User credentials invalid' }, 401);
    }

    return { message: 'User successfully logged in!', token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const { user } = req;

    return { message: 'User profile successfully retrieved!', user };
  }
}
