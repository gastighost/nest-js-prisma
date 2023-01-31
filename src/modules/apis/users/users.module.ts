import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/modules/services/prisma/prisma.module';
import { AuthModule } from 'src/modules/services/auth/auth.module';
import { WebsocketsModule } from 'src/modules/services/websockets/websockets.module';

@Module({
  imports: [PrismaModule, AuthModule, WebsocketsModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
