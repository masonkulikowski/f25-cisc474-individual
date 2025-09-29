import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, Courses } from "@repo/database";

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async course(
    courseWhereUniqueInput: Prisma.CoursesWhereUniqueInput,
  ): Promise<Courses | null> {
    return this.prisma.courses.findUnique({
      where: courseWhereUniqueInput,
    });
  }

  async findAll(): Promise<Courses[]> {
    return this.prisma.courses.findMany();
  }

  async findAllByUuid(uuid: string): Promise<Courses[]> {
    return this.prisma.courses.findMany({
      where: { id: uuid },
    });
  }
}