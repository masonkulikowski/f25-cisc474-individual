import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { SectionsModule } from './sections/sections.module';
import { CommentsModule } from './comments/comments.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [LinksModule, UsersModule, CoursesModule, AssignmentsModule, SubmissionsModule, SectionsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
