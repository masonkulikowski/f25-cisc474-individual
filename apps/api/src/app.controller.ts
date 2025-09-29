import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './users/users.service';
import { CourseService } from './courses/courses.service';
import { AssignmentsService } from './assignments/assignments.service';
import { SectionsService } from './sections/sections.service';
import { SubmissionsService } from './submissions/submissions.service';
import { CommentsService } from './comments/comments.service';
import { Users as UsersModel } from '@repo/database';
import { Courses as CoursesModel } from '@repo/database';
import { Assignments as AssignmentsModel } from '@repo/database';
import { Sections as SectionsModel } from '@repo/database';
import { Submissions as SubmissionsModel } from '@repo/database';
import { Comments as CommentsModel } from '@repo/database';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly courseService: CourseService,
    private readonly assignmentsService: AssignmentsService,
    private readonly sectionsService: SectionsService,
    private readonly submissionsService: SubmissionsService,
    private readonly commentsService: CommentsService,
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

  @Get('sections')
  async getSections(): Promise<SectionsModel[]> {
    return this.sectionsService.findAll();
  }

  @Get('sections/:id')
  async getSectionsByUuid(@Param('id') id: string): Promise<SectionsModel[]> {
    return this.sectionsService.findAllByUuid(id);
  }

  @Get('submissions')
  async getSubmissions(): Promise<SubmissionsModel[]> {
    return this.submissionsService.findAll();
  }

  @Get('submissions/:id')
  async getSubmissionsByUuid(@Param('id') id: string): Promise<SubmissionsModel[]> {
    return this.submissionsService.findAllByUuid(id);
  }

  @Get('comments')
  async getComments(): Promise<CommentsModel[]> {
    return this.commentsService.findAll();
  }

  @Get('comments/:id')
  async getCommentsByUuid(@Param('id') id: string): Promise<CommentsModel[]> {
    return this.commentsService.findAllByUuid(id);
  }
}