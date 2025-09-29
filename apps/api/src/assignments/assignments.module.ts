import { Controller, Get, Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { PrismaService } from '../prisma.service';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get()
  async findAll() {
    return this.assignmentsService.findAll();
  }
}

@Module({
  controllers: [AssignmentsController],
  providers: [AssignmentsService, PrismaService],
  exports: [AssignmentsService],
})
export class AssignmentsModule {}