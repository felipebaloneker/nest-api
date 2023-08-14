import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto/user.dto';
import {UserService} from '../../service/user/user.service';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService) {}

    @Post('/')
    async create(@Body() user: UserDto): Promise<UserDto> {
        const createUser = await this.usersService.create(user);
        return createUser
    }

    @Get('/')
    async findAll(): Promise<UserDto[]> {
        return this.usersService.findAll();
    }
}