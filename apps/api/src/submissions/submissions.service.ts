import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, Submissions } from "@repo/database";

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

    async submission(
        submissionWhereUniqueInput: Prisma.SubmissionsWhereUniqueInput,
        ): Promise<Submissions | null> {
        return this.prisma.submissions.findUnique({
          where: submissionWhereUniqueInput,
        });
      }

  async findAll(): Promise<Submissions[]> {
    return this.prisma.submissions.findMany();
  }

  async findAllByUuid(uuid: string): Promise<Submissions[]> {
    return this.prisma.submissions.findMany({
      where: { id: uuid },
    });
  }
}
