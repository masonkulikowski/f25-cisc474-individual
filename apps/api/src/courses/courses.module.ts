import { Controller, Get, Module } from '@nestjs/common';
import { CourseService } from './courses.service';
import { PrismaService } from '../prisma.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll() {
    return this.courseService.findAll();
  }
}

@Module({
  controllers: [CoursesController],
  providers: [CourseService, PrismaService],
  exports: [CourseService],
})
export class CoursesModule {}