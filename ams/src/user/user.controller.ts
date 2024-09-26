import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { RolesIN } from 'src/guards/roles.decorator';
import { Roles } from './role.enum';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    @RolesIN([Roles.ADMIN, Roles.SUPERADMIN])
    @UseGuards(RolesGuard)
    async createUser(@Body() user: User): Promise<User> {
        return await this.userService.create(user);
    }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('/:id')
    getUserByid(@Param('id') id: number): Promise<User> {
        const user = this.userService.findOne(id);
        if (user) return user;
        throw new NotFoundException("Record not Found");
    }

    @Put('/:id')
    @RolesIN([Roles.ADMIN, Roles.SUPERADMIN])
    @UseGuards(RolesGuard)
    updateUser(@Param('id') id: number, @Body() user: User): void {
        this.userService.update(id, user);
    }

    @Delete('/:id')
    @RolesIN([Roles.ADMIN, Roles.SUPERADMIN])
    @UseGuards(RolesGuard)
    deleteUser(@Param('id') id: number): void {
        this.userService.remove(id);
    }
}
