import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { WebsocketsModule } from 'src/gateways/websockets/websockets.module';

@Module({
  imports: [PrismaModule, AuthModule, WebsocketsModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
