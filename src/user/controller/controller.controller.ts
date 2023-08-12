import { Controller, Get, Post } from '@nestjs/common';

@Controller('controller')
export class ControllerController {
    @Post()
    create():string{
        return 'This action adds new user';
    }
    @Get()
    findAll(): string{
        return "This action returns all Users";
    }
}
