import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { AuthModule } from 'src/services/auth/auth.module';
import { WebsocketsModule } from 'src/services/websockets/websockets.module';

@Module({
  imports: [PrismaModule, AuthModule, WebsocketsModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
