import { Module } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CoursesController } from './courses.controller';

@Module({
  controllers: [CoursesController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CoursesModule {}