import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, Users } from "@repo/database";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

    async user(
    userWhereUniqueInput: Prisma.UsersWhereUniqueInput,
  ): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findAll(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async findOne(id: string) {
    return this.prisma.users.findFirst({ where: { id } });
  }

  async findAllByUuid(uuid: string): Promise<Users[]> {
    return this.prisma.users.findMany({
      where: { id: uuid },
    });
  }
}