import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, Comments } from "@repo/database";

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

    async comment(
        commentWhereUniqueInput: Prisma.CommentsWhereUniqueInput,
      ): Promise<Comments | null> {
        return this.prisma.comments.findUnique({
          where: commentWhereUniqueInput,
        });
      }

  async findAll(): Promise<Comments[]> {
    return this.prisma.comments.findMany();
  }

  async findAllByUuid(uuid: string): Promise<Comments[]> {
    return this.prisma.comments.findMany({
      where: { id: uuid },
    });
  }
}
