import { Injectable } from "@nestjs/common";
import { PrismaService } from "./database/prisma/prisma.service";

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  async getHello() {
    return await this.prismaService.employee.findMany();
  }
}
