import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './users/users.service';
import { Users as UsersModel } from '@repo/database';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getUsers(): Promise<UsersModel[]> {
    return this.userService.findAll();
  }

  @Get('users/:id')
  async getUsersByUuid(@Param('id') id: string): Promise<UsersModel[]> {
    return this.userService.findAllByUuid(id);
  }

}
