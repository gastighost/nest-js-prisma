import { Module } from '@nestjs/common';
import { BookingsModule } from './models/bookings/bookings.module';
import { PrismaModule } from './services/prisma/prisma.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './services/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WebsocketsModule } from './services/websockets/websockets.module';

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
