import { Module } from '@nestjs/common';
import { UserService } from './service/user/user.service';
import { PrismaService } from 'src/database/prisma.service';
import { UserController } from './controller/user/user.controller';

@Module({
  controllers: [ UserController],
  providers: [PrismaService,UserService]
})
export class UserModule {}
