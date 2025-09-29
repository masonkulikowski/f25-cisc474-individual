import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, Assignments } from "@repo/database";

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async assignment(
    assignmentWhereUniqueInput: Prisma.AssignmentsWhereUniqueInput,
  ): Promise<Assignments | null> {
    return this.prisma.assignments.findUnique({
      where: assignmentWhereUniqueInput,
    });
  }

  async findAll(): Promise<Assignments[]> {
    return this.prisma.assignments.findMany();
  }

  async findAllByUuid(uuid: string): Promise<Assignments[]> {
    return this.prisma.assignments.findMany({
      where: { id: uuid },
    });
  }
}