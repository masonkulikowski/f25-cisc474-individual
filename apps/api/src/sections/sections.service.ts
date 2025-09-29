import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, Sections } from "@repo/database";

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) {}

    async section(
        sectionWhereUniqueInput: Prisma.SectionsWhereUniqueInput,
        ): Promise<Sections | null> {
        return this.prisma.sections.findUnique({
            where: sectionWhereUniqueInput,
        });
    }

  async findAll(): Promise<Sections[]> {
    return this.prisma.sections.findMany();
  }

  async findAllByUuid(uuid: string): Promise<Sections[]> {
    return this.prisma.sections.findMany({
      where: { id: uuid },
    });
  }
}
