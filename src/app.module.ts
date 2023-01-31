import { Module } from '@nestjs/common';
import { BookingsModule } from './modules/apis/bookings/bookings.module';
import { PrismaModule } from './modules/services/prisma/prisma.module';
import { UsersModule } from './modules/apis/users/users.module';
import { AuthModule } from './modules/services/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WebsocketsModule } from './modules/services/websockets/websockets.module';

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
