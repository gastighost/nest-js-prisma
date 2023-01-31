import { Module } from '@nestjs/common';
import { BookingsModule } from './modules/bookings/bookings.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WebsocketsModule } from './modules/websockets/websockets.module';

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
