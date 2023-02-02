import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { AuthService } from 'src/services/auth/auth.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { WebsocketsGateway } from 'src/services/websockets/websockets.gateway';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly websocketsGateway: WebsocketsGateway,
  ) {}

  async createUser(userData: Prisma.UserCreateInput) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new HttpException(
        { error: 'This email has already been taken' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await hash(userData.password, 12);

    const user = await this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });

    delete user.password;

    return user;
  }

  async getUser(userData: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({
      where: userData,
    });

    return user;
  }

  async loginUser(loginData: { email: string; password: string }) {
    const { email, password } = loginData;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new HttpException(
        { error: 'User credentials invalid' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const match = await compare(password, user.password);

    if (!match) {
      throw new HttpException(
        { error: 'User credentials invalid' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.authService.generateJwt({
      id: user.id,
      email: user.email,
    });

    this.websocketsGateway.emitEvent(
      'user_login',
      `${user.firstName} ${user.lastName} logged in!`,
    );

    return token;
  }
}
