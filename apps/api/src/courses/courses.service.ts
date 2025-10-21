import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CourseCreateIn, CourseUpdateIn, CourseOut } from "@repo/api/courses";

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}
  async create(createCourseDto: CourseCreateIn): Promise<CourseOut> {
    const newCourse = await this.prisma.courses.create({
      data: createCourseDto,
    });
    return {
      course_name: newCourse.course_name,
      course_desc: newCourse.course_desc,
      users_id: newCourse.users_id,
      id: newCourse.id,
      created_at: newCourse.created_at.toString(),
      updated_at: newCourse.updated_at.toString(),
    };
  }

  findAll() {
    return this.prisma.courses.findMany();
  }

  findAllByUuid(id: string) {
    return this.prisma.courses.findMany({
      where: { id },
    });
  }

  update(id: string, updateCourseDto: CourseUpdateIn) {
    return this.prisma.courses.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  remove(id: string) {
    return this.prisma.courses.delete({
      where: { id },
    });
  }
}