import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/database/prisma.service';
import { UserDto } from 'src/user/dto/user.dto/user.dto';

@Injectable()
export class UserService {
    constructor(private prisma:PrismaService){}
    
    async create(user: UserDto): Promise<UserDto> {
        try {
           const response = await this.prisma.user.create({
                data: {
                    id: randomUUID(),
                    name: user.name,
                    lastName: user.lastName,
                },
            });
            return response
        } catch (error) {
            console.error('Error on create User:', error);
            throw new Error('Error on create User.');
        }
    }
    
    async findAll(): Promise<UserDto[]> {
        try {
            const users = await this.prisma.user.findMany();
            return users.map(user => ({
                id: user.id,
                name: user.name,
                lastName: user.lastName,
            }));
        } catch (error) {
            console.error('Error on find User:', error);
            throw new Error('Error on find User.');
        }
    }
}
