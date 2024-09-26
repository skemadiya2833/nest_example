import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllUsers(): User[] {
    return this.appService.getAllUsers();
  }

  @Get('/:emailId')
  getUserByEmail(@Param('emailId') emailId: string): User {
    return this.appService.getUserById(emailId);
  }

  @Post()
  postUser(@Body() user: User): string{
    return this.appService.createUser(user);
  }

  @Put('/:emailId')
  updateUser(@Param('emailId') emailId: string, @Body() user: User): string{
    return this.appService.updateUser(emailId, user);
  }
}
