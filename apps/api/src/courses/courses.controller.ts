import { Controller, Get, Patch, Post, Delete, Body, Param } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CourseRef, CourseCreateIn, CourseUpdateIn } from '@repo/api/courses';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findAllByUuid(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: CourseUpdateIn) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Post()
  create(@Body() createCourseDto: CourseCreateIn) {
    return this.courseService.create(createCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}