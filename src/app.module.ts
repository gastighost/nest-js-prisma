import { Module } from '@nestjs/common';
import { BookingsModule } from './models/bookings/bookings.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WebsocketsModule } from './gateways/websockets/websockets.module';

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
