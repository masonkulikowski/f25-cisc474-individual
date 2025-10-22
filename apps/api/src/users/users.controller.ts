import { Controller, Get, UseGuards, UnauthorizedException, Param } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@CurrentUser() auth: JwtUser) {
     if (!auth || !auth.userId) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne(auth.userId);
    if (!user) {
      throw new Error('User not found');
    }
    // Return only what your client needs (include the DB id!)
    return {
      id: user.id,
      name: user.first_name + ' ' + user.last_name,
      email: user.email,
    };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
    findOne(@Param('id') id: string) {
    return this.userService.findAllByUuid(id);
  }
}