import { Controller, Get, Patch, Post, Delete, Body, UseGuards, Param } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CourseRef, CourseCreateIn, CourseUpdateIn } from '@repo/api/courses';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';



@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findAllByUuid(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: CourseUpdateIn) {
    return this.courseService.update(id, updateCourseDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCourseDto: CourseCreateIn, @CurrentUser() user: JwtUser) {
    createCourseDto.users_id = user.userId;
    return this.courseService.create(createCourseDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}