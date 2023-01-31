import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signup(@Body() body: CreateUserDto) {
    const { firstName, lastName, email, phone, password } = body;

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

    return { message: 'User successfully logged in!', token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const { user } = req;

    return { message: 'User profile successfully retrieved!', user };
  }
}
