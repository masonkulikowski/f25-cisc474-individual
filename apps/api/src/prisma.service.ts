import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@repo/database';

@Injectable() 
export class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }
}
