import { Module } from '@nestjs/common';
import { ControllerController } from './controller/controller.controller';
import { UserService } from './service/user/user.service';

@Module({
  controllers: [ControllerController],
  providers: [UserService]
})
export class UserModule {}
