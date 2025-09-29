import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
    findOne(@Param('id') id: string) {
    return this.userService.findAllByUuid(id);
  }
}