import { Module } from '@nestjs/common';
import { BookingsModule } from './bookings/bookings.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [
    BookingsModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    WebsocketsModule,
  ],
})
export class AppModule {}
