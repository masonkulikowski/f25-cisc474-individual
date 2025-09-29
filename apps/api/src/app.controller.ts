import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './users/users.service';
import { CourseService } from './courses/courses.service';
import { AssignmentsService } from './assignments/assignments.service';
import { Users as UsersModel } from '@repo/database';
import { Courses as CoursesModel } from '@repo/database';
import { Assignments as AssignmentsModel } from '@repo/database';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, 
    private readonly userService: UserService,
    private readonly courseService: CourseService,
    private readonly assignmentsService: AssignmentsService,
  ) {}

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

  @Get('courses')
  async getCourses(): Promise<CoursesModel[]> {
    return this.courseService.findAll();
  }

  @Get('courses/:id')
  async getCoursesByUuid(@Param('id') id: string): Promise<CoursesModel[]> {
    return this.courseService.findAllByUuid(id);
  }

  @Get('assignments')
  async getAssignments(): Promise<AssignmentsModel[]> {
    return this.assignmentsService.findAll();
  }

  @Get('assignments/:id')
  async getAssignmentsByUuid(@Param('id') id: string): Promise<AssignmentsModel[]> {
    return this.assignmentsService.findAllByUuid(id);
  }
}